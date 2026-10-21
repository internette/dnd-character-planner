import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { AltList } from "./AltList";
import * as stories from "./AltList.stories";

const { Default, CustomJoiner } = composeStories(stories);

describe("AltList", () => {
  it("renders one list item per alternative", () => {
    render(<Default />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it('joins the name and text with ": " by default', () => {
    render(<AltList items={[{ name: "Hold Monster", text: "single-target lockdown for boss fights." }]} />);
    expect(screen.getByRole("listitem")).toHaveTextContent("Hold Monster: single-target lockdown for boss fights.");
    expect(screen.getByText("Hold Monster").tagName).toBe("STRONG");
  });

  it("uses a custom joiner", () => {
    render(<CustomJoiner />);
    expect(screen.getByRole("listitem")).toHaveTextContent(
      "Shatter, upcast: your existing strike option until this arrives.",
    );
  });

  it("hides the chevron from assistive tech", () => {
    const { container } = render(<Default />);
    const chevrons = container.querySelectorAll("svg.cp-chev");
    expect(chevrons).toHaveLength(2);
    chevrons.forEach((svg) => expect(svg).toHaveAttribute("aria-hidden", "true"));
  });

  it("merges className onto the root", () => {
    const { container } = render(<AltList items={[]} className="extra" />);
    expect(container.firstElementChild).toHaveClass("cp-alts", "extra");
  });

  it.each(Object.entries({ Default, CustomJoiner }))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
