import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { PageHero } from "./PageHero";
import * as stories from "./PageHero.stories";

const { Character, Supplement, NoSwirl } = composeStories(stories);

describe("PageHero", () => {
  it("renders an h1 at xl and an h2 at lg", () => {
    const { unmount } = render(<Character />);
    expect(screen.getByRole("heading", { level: 1, name: "Ciaccona" })).toBeInTheDocument();
    unmount();
    render(<Supplement />);
    expect(screen.getByRole("heading", { level: 2, name: "Gather & Strike" })).toBeInTheDocument();
  });

  it("hides the swirl from assistive tech and removes it with swirl={false}", () => {
    const { container, unmount } = render(<Character />);
    expect(container.querySelector(".cp-hero-swirl")).toHaveAttribute("aria-hidden", "true");
    unmount();
    const { container: noSwirl } = render(<NoSwirl />);
    expect(noSwirl.querySelector(".cp-hero-swirl")).toBeNull();
  });

  it("renders tags as a list", () => {
    render(<Character />);
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "Aero theme",
      "Wandering performer",
      "Gather · Hold · Strike",
    ]);
  });

  it("omits optional parts when empty", () => {
    const { container } = render(<PageHero title="Gather & Strike" tags={[]} />);
    expect(container.querySelector(".cp-hero-eyebrow")).toBeNull();
    expect(container.querySelector(".cp-hero-sub")).toBeNull();
    expect(container.querySelector(".cp-hero-tags")).toBeNull();
  });

  it("merges className onto the root", () => {
    const { container } = render(<PageHero title="Ciaccona" className="extra" />);
    expect(container.firstElementChild).toHaveClass("cp-hero", "extra");
  });

  it.each(Object.entries({ Character, Supplement, NoSwirl }))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
