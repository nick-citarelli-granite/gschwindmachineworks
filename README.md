# Karl Gschwind Machine Works demo

A static, one-page website concept. The site source is in `src/`:

- `index.html` — content and structure
- `styles.css` — layout, maroon/steel visual design, and CSS animations
- `main.js` — mobile navigation, header state, scroll reveals, and copyright year
- `assets/` — the illustrative machined-part image

No build step or external dependencies are required. To preview locally:

```sh
python -m http.server 4173 --directory src
```

Then open [http://localhost:4173](http://localhost:4173). Point a static host's publish directory at `src/`.

Background research and content sources are documented in [docs/research.md](docs/research.md).

