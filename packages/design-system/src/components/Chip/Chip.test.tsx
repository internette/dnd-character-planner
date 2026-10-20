import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Chip, PHASE_LABEL, type ChipProps, type Phase } from "./Chip";
import * as stories from "./Chip.stories";

const all = composeStories(stories);

describe("Chip", () => {
  it("renders its value", () => {
    render(<Chip value="Song of Rest d8" />);
    expect(screen.getByText("Song of Rest d8")).toHaveClass("cp-chip");
  });

  it("defaults to neutral and sm", () => {
    render(<Chip value="5th-level spells" />);
    expect(screen.getByText("5th-level spells")).toHaveClass("cp-chip-neutral", "cp-chip-sm");
  });

  it.each<NonNullable<ChipProps["variant"]>>(["neutral", "instant", "concentration", "dm", "gather", "hold", "strike"])(
    "applies the %s variant class",
    (variant) => {
      render(<Chip variant={variant} value="Fact" />);
      expect(screen.getByText("Fact")).toHaveClass(`cp-chip-${variant}`);
    },
  );

  it("applies the md size class", () => {
    render(<Chip variant="hold" size="md" />);
    expect(screen.getByText("Hold")).toHaveClass("cp-chip-md");
    expect(screen.getByText("Hold")).not.toHaveClass("cp-chip-sm");
  });

  it.each(Object.entries(PHASE_LABEL))("renders the default word for %s", (phase, word) => {
    render(<Chip variant={phase as Phase} />);
    expect(screen.getByText(word)).toHaveClass(`cp-chip-${phase}`);
  });

  it("replaces the phase word with value", () => {
    render(<Chip variant="strike" value="Strike · AoE" />);
    expect(screen.getByText("Strike · AoE")).toHaveClass("cp-chip-strike");
    expect(screen.queryByText("Strike")).toBeNull();
  });

  it("merges className onto the root", () => {
    render(<Chip className="extra" value="Instant" />);
    expect(screen.getByText("Instant")).toHaveClass("cp-chip", "extra");
  });

  // Each variant's text/fill pair passing 4.5:1 in both themes is covered by
  // CONTRAST_PAIRS in src/styles/tokens/color/color.test.ts.

  it.each(Object.entries(all))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
