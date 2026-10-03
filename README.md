# Karl Gschwind Machine Works demo

A static, one-page website concept. Files are grouped by purpose:

- `src/html/` — editable page template and section partials
- `src/css/` — shared, section, motion, and responsive styles
- `src/js/` — small entry point and focused interaction modules
- `src/assets/` — illustrative machined-part image, steel texture, SVG brand mark, and icon sprite
- `src/index.html` — assembled page served by the static host
- `scripts/build.py` — assembles the HTML with no external dependencies
- `docs/` — research and third-party attribution

Run the dependency-free HTML assembly script after editing the template or a partial:

```sh
python scripts/build.py
```

To preview locally:

```sh
python -m http.server 4173 --directory src
```

Then open [http://localhost:4173](http://localhost:4173). Point a static host's publish directory at `src/`. The assembled `index.html` is committed, so hosting needs no build command.

The machined-part illustration is the hero background. On larger screens it scales to the hero height and stays anchored to the right; on narrow screens the full image appears below the copy. Both layouts preserve its proportions. Company highlights follow the hero, then a team-photo placeholder. When a real photograph is available, replace the contents of `.team-photo` in `src/html/partials/highlights-team.html` with an `<img>`, update the image's alternative text, and run `python scripts/build.py`.

Background research and content sources are documented in [docs/research.md](docs/research.md).

The capability tabs can be selected by click or with the arrow, Home, and End keys. Their diagrams are schematic illustrations; the published capacity figures remain in text. Motion respects the visitor's reduced-motion setting.

The company highlights and industries bands share the same engraving cycle. Each highlight pairs a published fact with a short explanation; the full lists remain available to screen readers and replace the animation when reduced motion is requested.

Decorative icons in `src/assets/icons.svg` are from [Lucide](https://lucide.dev), retrieved through the [Iconify SVG API](https://iconify.design/docs/api/svg.html) and stored locally so the site does not make runtime icon requests. License notices are in [docs/third-party-icons.md](docs/third-party-icons.md).

