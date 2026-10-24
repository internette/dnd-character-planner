import type { Meta, StoryObj } from "@storybook/react-vite";
import { LevelCard } from "./LevelCard";

const meta = {
  title: "Components/LevelCard",
  component: LevelCard,
  args: {
    id: "lv9",
    level: 9,
    title: "The Lingering Note",
    phase: "strike",
    features: ["5th-level spells", "Song of Rest d8"],
    picks: [
      {
        name: "Synaptic Static",
        meta: "XGtE · 5th · Bard",
        description:
          "A 20 ft psychic burst that keeps dragging down enemies' attacks and checks afterward. It's instant, so it never competes with a concentration spell you already have running.",
      },
    ],
    alternatives: [
      { name: "Hold Monster", text: "single-target lockdown for boss fights." },
      { name: "Shatter", joiner: ", ", text: "upcast: your existing strike option until this arrives." },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 880 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LevelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnePick: Story = {};

export const TwoPicks: Story = {
  args: {
    id: "lv10",
    level: 10,
    title: "The Vortex Opens",
    phase: "gather",
    features: ["Magical Secrets (2 spells)", "Expertise (2 skills)", "Bardic Inspiration d10"],
    picks: [
      {
        label: "Recommended · Secret 1",
        name: "Maelstrom",
        meta: "XGtE · 5th · Druid · Concentration",
        description:
          "A 30 ft swirling vortex of difficult terrain that drags enemies 10 ft toward its center every turn. Gather and hold in a single spell.",
      },
      {
        label: "Recommended · Secret 2",
        name: "Steel Wind Strike",
        meta: "XGtE · 5th · Wizard/Ranger",
        description: "Hits up to five foes at once. Reflavor the weapon flourish as a gust of pistol shots.",
      },
    ],
    alternatives: [
      {
        name: "Gravity Sinkhole",
        joiner: " ",
        text: "(EGtW) in place of Steel Wind Strike, if your DM allows Wildemount spells.",
      },
      { name: "Expertise:", joiner: " ", text: "Persuasion and Insight, if not already doubled." },
    ],
  },
};

export const NoAlternatives: Story = {
  args: { alternatives: [] },
};

export const Narrow: Story = {
  args: TwoPicks.args,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375 }}>
        <Story />
      </div>
    ),
  ],
};
