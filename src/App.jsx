export default function PKRReaperrPortfolio() {
  const photos = [
    {
      title: "Golden Hour",
      category: "Photography",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Still Motion",
      category: "Photography",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Lines of Silence",
      category: "Art",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "After Rain",
      category: "Photography",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Fragments",
      category: "Art",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Nocturne",
      category: "Photography",
      year: "2026",
      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">pkrreaperr.me</p>
            <h1 className="text-lg font-semibold tracking-wide">PKR Reaperr</h1>
          </div>
          <nav className="hidden gap-6 text-sm text-neutral-300 md:flex">
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-24">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Photography • Art • Archive</p>
            <h2 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
              A quiet home for photographs and visual work.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-neutral-300 md:text-lg">
              A minimalist portfolio designed to let the work speak first. Showcase selected
              series, featured images, and original art in a clean gallery experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#work"
                className="rounded-2xl border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                View gallery
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {photos.slice(0, 4).map((item) => (
              <div key={item.title} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm text-neutral-400">{item.category}</p>
                  <h3 className="mt-1 text-lg font-medium">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Selected Work</p>
              <h3 className="mt-2 text-3xl font-semibold md:text-4xl">Gallery</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-400 md:text-base">
              Replace these placeholders with your own collections, series titles, artwork, and
              high-resolution images.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {photos.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-sm text-neutral-400">
                    <span>{item.category}</span>
                    <span>{item.year}</span>
                  </div>
                  <h4 className="text-xl font-medium">{item.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">About</p>
            <h3 className="mt-3 text-3xl font-semibold">Built for visual storytelling</h3>
            <p className="mt-4 max-w-xl leading-7 text-neutral-300">
              This layout is designed for artists and photographers who want an elegant, modern,
              and image-first portfolio. Add a short artist statement, exhibition history, client
              list, or links to prints and commissions.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Features</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                "Minimal homepage hero",
                "Responsive image gallery",
                "Sections for art + photography",
                "Clean contact area",
                "Easy content replacement",
                "Ready for custom branding",
              ].map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-neutral-200">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Contact</p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-3xl font-semibold md:text-4xl">Open for commissions, collaborations, and prints.</h3>
                <p className="mt-3 max-w-2xl leading-7 text-neutral-300">
                  Add your email, Instagram, shop link, or inquiry form here.
                </p>
              </div>
              <a
                href="mailto:hello@pkrreaperr.me"
                className="inline-flex rounded-2xl border border-white bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                hello@pkrreaperr.me
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-sm text-neutral-500 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PKR Reaperr</p>
          <p>Hosted on pkrreaperr.me</p>
        </div>
      </footer>
    </div>
  );
}
