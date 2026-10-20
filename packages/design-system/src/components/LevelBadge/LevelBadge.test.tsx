import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { LevelBadge } from "./LevelBadge";
import * as stories from "./LevelBadge.stories";

const { Default, Range } = composeStories(stories);

describe("LevelBadge", () => {
  it('has the accessible name "Level N"', () => {
    render(<LevelBadge level={12} />);
    expect(screen.getByRole("img", { name: "Level 12" })).toHaveClass("cp-level");
  });

  it("renders the numeral and label, hidden from assistive tech", () => {
    const { container } = render(<LevelBadge level={9} />);
    expect(container.querySelector(".cp-level-num")).toHaveTextContent("9");
    expect(container.querySelector(".cp-level-num")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".cp-level-label")).toHaveTextContent("LEVEL");
    expect(container.querySelector(".cp-level-label")).toHaveAttribute("aria-hidden", "true");
  });

  it("merges className onto the root", () => {
    render(<LevelBadge level={9} className="extra" />);
    expect(screen.getByRole("img")).toHaveClass("cp-level", "extra");
  });

  it.each(Object.entries({ Default, Range }))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
