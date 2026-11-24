# Illustrated Boundary Chain Model

An interactive diagram showing how the Great Lakes Climate Adaptation Network (GLCAN) and its partners worked as a boundary chain to help Great Lakes cities assess climate vulnerability.


| File         | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| `index.html` | All page content, including the text of every info panel    |
| `styles.css` | Layout and styling                                          |
| `app.js`     | Opens/closes info panels and draws the connecting lines     |
| `images/`    | Organization logos                                          |

## Editing content

Edit `index.html` directly. Each node is an `<li>` in the diagram list; nodes with details have a `<button class="node">` and a matching `<div class="panel">`. Grid placement is set by `grid-area` and the `grid-template-areas` in `styles.css`; connecting lines are listed in `EDGES` in `app.js`.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` directly from disk won't run `app.js`, because browsers block ES modules on `file://`.)

## Deploy to GitHub Pages

In the repository's **Settings → Pages**, set **Source** to “Deploy from a branch”, branch `master`, folder `/ (root)`. The `.nojekyll` file tells Pages to serve the files as-is.

## Accessibility

The page targets WCAG 2.2 AA: semantic headings and lists, a text description of the chain for screen readers, disclosure buttons with `aria-expanded`, keyboard support (Enter/Space to open, Escape to close, focus returns to the node), visible focus outlines, AA colour contrast, alt text for logos, titled video embeds, and a layout that reflows at 320px wide.
