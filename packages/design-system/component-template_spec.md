# <Name> component spec

Parent: [root spec](../../../design-system_spec.md). Read the root spec's shared component rules first; this file only adds what is specific to <Name>.

Every component spec has these sections in this order. Purpose through Examples describe the component; Styling through Open questions guide the build. When a section doesn't apply, write "None." and one line on why.

## Purpose

What the component is for and when to use it, in a sentence or two.

## Anatomy

Its parts, in reading order.

## API

The props as a TypeScript interface with defaults, any other exports, and the components it composes.

## Markup

The HTML it renders, with its `cp-` classes, and any change from the reference markup.

## Configuration

What goes in each prop: its default, what changing it does, and the content rules for the text it carries.

## Variants

Each visual variation and when to use it, whether a prop sets it (such as `variant` or `shape`) or a state does (such as `current`).

## Behavior

What it renders when optional props are empty, how it wraps and adapts to narrow screens, and how it responds to hover, focus and links.

## Accessibility

Semantics, ARIA, heading level, keyboard focus, touch target size and contrast.

## Examples

### Stories

Each story, with its example content written out in full.

### MDX docs page

The order of the page's sections and stories.

## Styling

A table of parts and the tokens each uses, named without prefixes as the root spec describes (`ink`, `space-4`, `heading-sm`). No raw values.

## Tests

## Acceptance criteria

## Open questions
