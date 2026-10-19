import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { PHASE_LABEL, PhaseTag, type Phase } from "./PhaseTag";
import * as stories from "./PhaseTag.stories";

const { Gather, Hold, Strike, Small, AllPhases } = composeStories(stories);

describe("PhaseTag", () => {
  it.each(Object.entries(PHASE_LABEL))("renders the default word for %s", (phase, word) => {
    render(<PhaseTag phase={phase as Phase} />);
    expect(screen.getByText(word)).toHaveClass("cp-phase", `cp-phase-${phase}`);
  });

  it("applies md by default and sm when asked", () => {
    const { container, unmount } = render(<PhaseTag phase="hold" />);
    expect(container.firstElementChild).toHaveClass("cp-phase-md");
    unmount();
    const { container: small } = render(<PhaseTag phase="hold" size="sm" />);
    expect(small.firstElementChild).toHaveClass("cp-phase-sm");
    expect(small.firstElementChild).not.toHaveClass("cp-phase-md");
  });

  it("replaces the word with children", () => {
    render(<PhaseTag phase="strike">Strike · AoE</PhaseTag>);
    expect(screen.getByText("Strike · AoE")).toHaveClass("cp-phase-strike");
    expect(screen.queryByText("Strike")).toBeNull();
  });

  it("merges className onto the root", () => {
    const { container } = render(<PhaseTag phase="gather" className="extra" />);
    expect(container.firstElementChild).toHaveClass("cp-phase", "extra");
  });

  // Each phase's text/tint pair passing 4.5:1 in both themes is covered by
  // CONTRAST_PAIRS in src/styles/tokens/color/color.test.ts.

  it.each(Object.entries({ Gather, Hold, Strike, Small, AllPhases }))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
