# Karl Gschwind Machine Works demo

A static, one-page website concept. The site source is in `src/`:

- `index.html` — content and structure
- `styles.css` — layout, maroon/steel visual design, and CSS animations
- `main.js` — mobile navigation, accessible capability tabs, scroll reveals, and copyright year
- `assets/` — illustrative machined-part image and small steel texture

No build step or external dependencies are required. To preview locally:

```sh
python -m http.server 4173 --directory src
```

Then open [http://localhost:4173](http://localhost:4173). Point a static host's publish directory at `src/`.

The team-photo area after the opening machining section is a placeholder. When a real photograph is available, replace the contents of `.team-photo` in `src/index.html` with an `<img>` and update the image's alternative text. The site needs no build system or image service.

Background research and content sources are documented in [docs/research.md](docs/research.md).

