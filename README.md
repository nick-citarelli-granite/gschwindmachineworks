# Karl Gschwind Machine Works demo

A static, one-page website concept. The site source is in `src/`:

- `index.html` — content and structure
- `styles.css` — layout, maroon/steel visual design, and CSS animations
- `main.js` — mobile navigation, accessible capability tabs, pointer-guided process diagrams, scroll reveals, and copyright year
- `assets/` — illustrative machined-part image and small steel texture

No build step or external dependencies are required. To preview locally:

```sh
python -m http.server 4173 --directory src
```

Then open [http://localhost:4173](http://localhost:4173). Point a static host's publish directory at `src/`.

The machined-part illustration is the hero background. On larger screens it scales to the hero height and stays anchored to the right; on narrow screens the full image appears below the copy. Both layouts preserve its proportions. Company highlights follow the hero, then a team-photo placeholder. When a real photograph is available, replace the contents of `.team-photo` in `src/index.html` with an `<img>` and update the image's alternative text. The site needs no build system or image service.

Background research and content sources are documented in [docs/research.md](docs/research.md).

The capability tabs can be selected by click or with the arrow, Home, and End keys. Their diagrams are schematic illustrations; the published capacity figures remain in text. Motion respects the visitor's reduced-motion setting.

The industries band cycles through the published sectors in step with its light pass. Its full list remains available to screen readers and replaces the animation when reduced motion is requested.

