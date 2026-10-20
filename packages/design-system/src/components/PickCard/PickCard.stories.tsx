import type { Meta, StoryObj } from "@storybook/react-vite";
import { PickCard } from "./PickCard";

const meta = {
  title: "Components/PickCard",
  component: PickCard,
  args: {
    name: "Hypnotic Pattern",
    meta: "PHB 2014 · 3rd · Bard · Concentration",
    children:
      "Stops everyone in a 30 ft cube who fails the save. Drop it on a cluster Maelstrom already pulled together and the whole group is out of the fight.",
  },
  argTypes: {
    children: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PickCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecretLabel: Story = {
  args: { label: "Recommended · Secret 1" },
};
