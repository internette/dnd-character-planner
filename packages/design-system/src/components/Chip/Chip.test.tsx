import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Chip, type ChipProps } from "./Chip";
import * as stories from "./Chip.stories";

const { Neutral, Instant, Concentration, Dm, AllTones } = composeStories(stories);

describe("Chip", () => {
  it("renders its children", () => {
    render(<Chip>Song of Rest d8</Chip>);
    expect(screen.getByText("Song of Rest d8")).toHaveClass("cp-chip");
  });

  it("defaults to neutral", () => {
    render(<Chip>5th-level spells</Chip>);
    expect(screen.getByText("5th-level spells")).toHaveClass("cp-chip-neutral");
  });

  it.each<NonNullable<ChipProps["tone"]>>(["neutral", "instant", "concentration", "dm"])("applies the %s tone class", (tone) => {
    render(<Chip tone={tone}>Fact</Chip>);
    expect(screen.getByText("Fact")).toHaveClass(`cp-chip-${tone}`);
  });

  it("merges className onto the root", () => {
    render(<Chip className="extra">Instant</Chip>);
    expect(screen.getByText("Instant")).toHaveClass("cp-chip", "extra");
  });

  it.each(Object.entries({ Neutral, Instant, Concentration, Dm, AllTones }))("%s has no axe violations", async (_, Story) => {
    const { container } = render(<Story />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
