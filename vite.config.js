import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Runs the Vercel functions in api/ during `npm run dev`, so the Instagram feed works
// locally with a token in .env.local (Vercel runs them for real in production).
function vercelApiDev() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

      server.middlewares.use('/api', async (req, res, next) => {
        const name = req.url.split('?')[0].replace(/^\/+|\/+$/g, '')
        if (!/^[a-z0-9-]+$/.test(name)) return next()
        if (!existsSync(join(process.cwd(), 'api', `${name}.js`))) return next()

        try {
          const module = await server.ssrLoadModule(`/api/${name}.js`)
          const handler = module[req.method]
          if (!handler) return next()

          const request = new Request(`http://localhost${req.originalUrl}`, {
            method: req.method,
            headers: req.headers,
          })
          const response = await handler(request)

          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDev()],
})
