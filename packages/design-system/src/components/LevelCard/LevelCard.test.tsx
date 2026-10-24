import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { LevelCard } from "./LevelCard";
import * as stories from "./LevelCard.stories";

const { OnePick, TwoPicks, NoAlternatives, Narrow } = composeStories(stories);

describe("LevelCard", () => {
  it("renders one pick without the .cp-picks wrapper", () => {
    const { container } = render(<OnePick />);
    expect(container.querySelector(".cp-picks")).toBeNull();
    expect(container.querySelectorAll(".cp-pick")).toHaveLength(1);
  });

  it("wraps two picks in .cp-picks", () => {
    const { container } = render(<TwoPicks />);
    expect(container.querySelectorAll(".cp-picks > .cp-pick")).toHaveLength(2);
  });

  it("omits features, phase, picks and alternatives when empty", () => {
    const { container } = render(<LevelCard level={9} title="The Lingering Note" />);
    expect(container.querySelector(".cp-chip")).toBeNull();
    expect(container.querySelector(".cp-pick")).toBeNull();
    expect(container.querySelector(".cp-alts")).toBeNull();
  });

  it("shows each feature as a green chip and the phase as a pill", () => {
    const { container } = render(<OnePick />);
    expect(screen.getByText("5th-level spells")).toHaveClass("cp-chip-green", "cp-chip-rectangle");
    expect(screen.getByText("Strike")).toHaveClass("cp-chip-red", "cp-chip-pill");
    expect(container.querySelectorAll(".cp-chip")).toHaveLength(3);
  });

  it("puts id on the article and labels it with the title", () => {
    render(<OnePick />);
    const article = screen.getByRole("article", { name: "The Lingering Note" });
    expect(article).toHaveAttribute("id", "lv9");
    expect(screen.getByRole("heading", { level: 3, name: "The Lingering Note" })).toBeInTheDocument();
  });

  it("merges className onto the root", () => {
    const { container } = render(<LevelCard level={9} title="The Lingering Note" className="extra" />);
    expect(container.firstElementChild).toHaveClass("cp-levelcard", "extra");
  });

  it.each(Object.entries({ OnePick, TwoPicks, NoAlternatives, Narrow }))(
    "%s has no axe violations",
    async (_, Story) => {
      const { container } = render(<Story />);
      expect((await axe(container)).violations).toEqual([]);
    },
  );
});
