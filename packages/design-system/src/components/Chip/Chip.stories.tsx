import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: { children: "5th-level spells" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Instant: Story = {
  args: { tone: "instant", children: "Instant" },
};

export const Concentration: Story = {
  args: { tone: "concentration", children: "Concentration" },
};

export const Dm: Story = {
  name: "DM",
  args: { tone: "dm", children: "Ask your DM" },
};

export const AllTones: Story = {
  render: () => (
    <div className="cp-row">
      <Chip>5th-level spells</Chip>
      <Chip>Song of Rest d8</Chip>
      <Chip tone="instant">Instant</Chip>
      <Chip tone="concentration">Concentration</Chip>
      <Chip tone="instant">No concentration</Chip>
      <Chip tone="dm">Ask your DM</Chip>
    </div>
  ),
};
