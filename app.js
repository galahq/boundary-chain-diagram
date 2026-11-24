// Interactive behaviour for the boundary chain diagram.
// No dependencies: disclosure panels + SVG connector lines.

const NARROW = window.matchMedia('(max-width: 500px)')
const GAP = 10 // px between a node and its panel
const EDGE = 16 // px to keep between a panel and the viewport edge

// Chain connections, drawn as lines from one node to the next.
const EDGES = [
  ['data', 'glisa'],
  ['glisa', 'hrwc'],
  ['glisa', 'headwaters'],
  ['hrwc', 'glcan'],
  ['headwaters', 'glcan'],
  ['glcan', 'cleveland'],
  ['glcan', 'evanston'],
  ['glcan', 'indianapolis'],
  ['glcan', 'dearborn'],
  ['glcan', 'annarbor'],
]

const grid = document.querySelector('.grid')
const svg = document.querySelector('.connectors')
const triggers = [...document.querySelectorAll('button.node[aria-controls]')]

let openTrigger = null

/* ---------- Panels ---------- */

function panelFor(trigger) {
  return document.getElementById(trigger.getAttribute('aria-controls'))
}

function openPanel(trigger) {
  if (openTrigger && openTrigger !== trigger) closePanel({ restoreFocus: false })

  const panel = panelFor(trigger)
  trigger.setAttribute('aria-expanded', 'true')
  panel.hidden = false
  openTrigger = trigger
  positionPanel()
  panel.focus({ preventScroll: true })
  panel.scrollIntoView({ block: 'nearest' })
}

function closePanel({ restoreFocus = true } = {}) {
  if (!openTrigger) return

  const trigger = openTrigger
  const panel = panelFor(trigger)
  const focusWasInside = panel.contains(document.activeElement)

  panel.hidden = true
  trigger.setAttribute('aria-expanded', 'false')
  openTrigger = null

  if (restoreFocus && (focusWasInside || document.activeElement === document.body)) {
    trigger.focus()
  }
}

// Place the open panel beside its node (or below it on narrow screens),
// keeping it inside the viewport. Coordinates are relative to .grid, which
// is the panel's offset parent.
function positionPanel() {
  if (!openTrigger) return

  const panel = panelFor(openTrigger)
  const g = grid.getBoundingClientRect()
  const n = openTrigger.getBoundingClientRect()
  const viewportWidth = document.documentElement.clientWidth
  const pw = panel.offsetWidth

  let x
  let y

  if (NARROW.matches) {
    x = g.left
    y = n.bottom + GAP
  } else if (n.right + GAP + pw <= viewportWidth - EDGE) {
    x = n.right + GAP // right of the node
    y = n.top
  } else if (n.left - GAP - pw >= EDGE) {
    x = n.left - GAP - pw // left of the node
    y = n.top
  } else {
    x = Math.min(Math.max(n.left, EDGE), viewportWidth - EDGE - pw) // below
    y = n.bottom + GAP
  }

  panel.style.left = `${x - g.left}px`
  panel.style.top = `${y - g.top}px`
}

triggers.forEach(trigger => {
  const panel = panelFor(trigger)

  trigger.addEventListener('click', () => {
    if (openTrigger === trigger) {
      closePanel()
    } else {
      openPanel(trigger)
    }
  })

  panel.querySelector('.panel-close').addEventListener('click', () => closePanel())

  // Images change the panel's size once loaded.
  panel.querySelectorAll('img').forEach(img => img.addEventListener('load', positionPanel))
})

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && openTrigger) {
    const trigger = openTrigger
    const focusWasInside =
      panelFor(trigger).contains(document.activeElement) || document.activeElement === trigger
    closePanel({ restoreFocus: false })
    if (focusWasInside) trigger.focus()
  }
})

// Close when clicking anywhere outside the open panel and its node.
document.addEventListener('click', e => {
  if (!openTrigger) return
  if (openTrigger.contains(e.target) || panelFor(openTrigger).contains(e.target)) return
  closePanel({ restoreFocus: false })
})

/* ---------- Connectors ---------- */

const SVG_NS = 'http://www.w3.org/2000/svg'

function drawConnectors() {
  const origin = svg.getBoundingClientRect()
  const narrow = NARROW.matches
  const rectOf = id => {
    const r = document.getElementById(`node-${id}`).getBoundingClientRect()
    return {
      left: r.left - origin.left,
      right: r.right - origin.left,
      top: r.top - origin.top,
      bottom: r.bottom - origin.top,
    }
  }

  const paths = EDGES.map(([from, to]) => {
    const a = rectOf(from)
    const b = rectOf(to)
    const [x1, y1, x2, y2] = narrow
      ? [(a.left + a.right) / 2, a.bottom, (b.left + b.right) / 2, b.top]
      : [a.right, (a.top + a.bottom) / 2, b.left, (b.top + b.bottom) / 2]

    const path = document.createElementNS(SVG_NS, 'path')
    path.setAttribute('d', `M ${x1},${y1} L ${x2},${y2}`)
    return path
  })

  svg.replaceChildren(...paths)
}

function relayout() {
  drawConnectors()
  positionPanel()
}

new ResizeObserver(relayout).observe(grid)
window.addEventListener('resize', positionPanel)
NARROW.addEventListener('change', relayout)
if (document.fonts) document.fonts.ready.then(relayout)
relayout()
