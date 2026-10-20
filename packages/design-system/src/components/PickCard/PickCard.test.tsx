import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { PickCard } from "./PickCard";
import * as stories from "./PickCard.stories";

const { Default, SecretLabel } = composeStories(stories);

describe("PickCard", () => {
  it('defaults the label to "Recommended"', () => {
    render(<PickCard name="Hypnotic Pattern" />);
    expect(screen.getByText("Recommended")).toHaveClass("cp-pick-label");
  });

  it("renders the name as an h4", () => {
    render(<Default />);
    expect(screen.getByRole("heading", { level: 4, name: "Hypnotic Pattern" })).toBeInTheDocument();
  });

  it("omits meta and body when empty", () => {
    const { container } = render(<PickCard name="Hypnotic Pattern" />);
    expect(container.querySelector(".cp-meta")).toBeNull();
    expect(container.querySelector(".cp-pick-body")).toBeNull();
  });

  it("renders a custom label", () => {
    render(<SecretLabel />);
    expect(screen.getByText("Recommended · Secret 1")).toHaveClass("cp-pick-label");
  });

  it("merges className onto the root", () => {
    const { container } = render(<PickCard name="Hypnotic Pattern" className="extra" />);
    expect(container.firstElementChild).toHaveClass("cp-pick", "extra");
  });

  // gold on gold-tint passing 4.5:1 in both themes is covered by
  // CONTRAST_PAIRS in src/styles/tokens/color/color.test.ts.

  it.each(Object.entries({ Default, SecretLabel }))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
