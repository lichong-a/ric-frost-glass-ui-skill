# Component gallery boundaries

- Component styles must use CSS Modules and load with the component that owns them.
- Share design tokens and explicit layout primitives. Do not add regional or global
  button/input/label/asterisk animation rules or override another component's transform,
  scale, pointer-events, or touch-action. Do not use `:global` to bypass isolation.
- Demo controls opt in to their own classes. A demo controls container must not skin
  buttons or labels supplied by an embedded upstream component.
- Dropdowns use an opaque reading surface, following Glide Select. Underlying text
  must not be visible through the menu. Preserve keyboard selection and focus return.
- Layout CSS Modules must not reference another control's legacy class. Even a
  nested `.aw-button` selector exports that key and can replace Button's namespace
  when style maps are merged. Reuse the Button component or an owned control class;
  retain the Vite CSS-module namespace regression.
- Keep frozen upstream files intact. Any upstream integration fix must use the existing
  locked adapter and a meaningful regression test.
- Validate pointer-driven demos with real mouse down, movement while held, and mouse up
  inside the gallery iframe. Include Shredder, Paper Crumple, Tear Ticket, Sling Button,
  Swipe Row, and Scrub Field. A click or a successful mount alone does not verify a drag.
- `catalog/use-categories.json` owns the 303 functional category assignments, source
  tags and display names. Keep each existing ID and hash link; demo paths and lazy
  loaders come from this directory rather than an assumed flat folder.
- Parameter APIs come from actual frozen/owned source. Definitions, editor fields,
  iframe configuration and copyable TSX must agree. Keep callback/ref/ReactNode
  values in genuine source; transient animation state is not configuration.
- Keep a pager's content and controls on the same normalized page/capacity. Derived
  totals remain authored expressions, not independent DIY overrides. Editable
  reorder datasets reject duplicate IDs before configuration dispatch.
- Canonical authored demos live in `catalog/demo-source-templates.json`. Routine
  regeneration must preserve the restored demos and their CSS Modules. Capture only
  authored source, then regenerate definitions, code and docs together.
- Gallery shell and business controls use the existing tokens. Effect canvases may
  use original colors, dark surfaces and visible intensity. A shared skin must not
  suppress shadows, light spill, edge decay or pointer gestures.
- Aero Shards and Shape Waves select their own renderer and report their own status.
  Wait for the locked root's `data-ready` first-frame marker before reporting ready.
  Unsupported or failed WebGPU renders show a recoverable state card; the labelled
  Canvas alternative requires an explicit user action. Catch Canvas setup and paint
  failures and release its loop resources. Never replace navigator.gpu/vgpu globally.
- Progressive routes use the directory's purpose categories for all 303 entries and
  the 88/215 provider subsets. Source families are tags, not a second taxonomy. Keep
  legacy routes as short migration entries. Generate and validate both kit and skill
  layouts before applying the owned-file manifest; preserve handwritten documents.
