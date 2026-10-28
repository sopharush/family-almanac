# The Family Almanac

A warm, printable and fillable home-management guide for busy families.

| File | What it is |
|---|---|
| `index.html` | Landing page. Visitors enter an email (captured by Netlify Forms as `signup`), then download the PDF or open the online version. |
| `family-almanac.html` | Fill-online version: 33 sections, auto-saves in the browser, prints to PDF. Also served at `/app`. |
| `The-Family-Almanac.pdf` | 70-page print-ready PDF (US Letter, fonts embedded). |
| `previews/` | Page images used on the landing page. |

## Deploy on Netlify
Static site, no build command. `netlify.toml` publishes the repo root.

1. Netlify → **Add new project → Import an existing project → GitHub** → choose this repo.
2. Leave the build command empty and deploy.
3. **Forms → Form notifications → Email** to get each signup by email.
