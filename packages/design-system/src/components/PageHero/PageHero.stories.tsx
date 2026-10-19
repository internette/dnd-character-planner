import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHero } from "./PageHero";

const meta = {
  title: "Components/PageHero",
  component: PageHero,
  args: {
    eyebrow: "D&D 5E · Character progression",
    title: "Ciaccona",
    subtitle: "College of Lore Bard — Crowd-Control Roadmap, Levels 9 to 14",
    tags: ["Aero theme", "Wandering performer", "Gather · Hold · Strike"],
  },
} satisfies Meta<typeof PageHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Character: Story = {};

export const Supplement: Story = {
  args: { size: "lg", title: "Gather & Strike", eyebrow: undefined, subtitle: undefined, tags: undefined },
};

export const NoSwirl: Story = {
  args: { swirl: false },
};
