a portfolio website for the popular photographer Rayflics.

IG: Rayflics

## Branch workflow

This repo now uses a simple two-branch flow:

- `main`: the stable live branch
- `preview`: the testing branch where new changes should go first

### How branches work

A branch is just a separate line of Git history. It lets you work on changes without touching the stable branch until you are ready.

In this repo, the idea is:

1. Make and test changes on `preview`.
2. Push `preview` to GitHub.
3. Verify the app still passes checks and looks right.
4. Merge `preview` into `main` only after you are happy with it.

### Daily workflow

Start new work on `preview`:

```powershell
git checkout preview
git pull origin preview
```

Commit your work:

```powershell
git add .
git commit -m "Describe your change"
git push origin preview
```

When the preview version looks good, move it into `main`:

```powershell
git checkout main
git pull origin main
git merge preview
git push origin main
```

### Safety benefit

If something breaks on `preview`, your `main` branch stays safe and unchanged.

### Automated checks

GitHub Actions now runs `npm run lint` and `npm run build` on pushes to both `preview` and `main`, plus pull requests into `main`.
