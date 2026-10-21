# <Name> component spec

Parent: [root spec](../../../design-system_spec.md). Read the root spec's shared component rules first; this file only adds what is specific to <Name>.

Every component spec has these sections in this order. The first seven describe the component; the last four guide the build. When a section doesn't apply, write "None." and one line on why.

## Purpose

What the component is for and when to use it, in a sentence or two. Name its parts when it has more than one.

## API

The props as a TypeScript interface with defaults, any other exports, the components it composes, and the HTML it renders.

## Configuration

What goes in each prop: its default, what changing it does, and the content rules for the text it carries.

## Variants

Each visual variation and when to use it, whether a prop sets it (such as `variant` or `shape`) or a state does (such as `current`).

## Behavior

What it renders when optional props are empty, how it wraps and adapts to narrow screens, and how it responds to hover, focus and links.

## Accessibility

Semantics, ARIA, heading level, keyboard focus, touch target size and contrast.

## Examples

Each story, with its example content written out in full, then the order of the MDX docs page.

## Styling

A table of parts and the tokens each uses, named without prefixes as the root spec describes (`ink`, `space-4`, `heading-sm`). No raw values.

## Tests

## Acceptance criteria

## Open questions
