import type { Meta, StoryObj } from "@storybook/react-vite";
import { PickCard } from "./PickCard";

const meta = {
  title: "Components/PickCard",
  component: PickCard,
  args: {
    name: "Hypnotic Pattern",
    meta: "PHB · 3rd · Bard · Concentration",
    children:
      "The best mass lockdown on the bard list. Drop it on a cluster Maelstrom already pulled together and the whole group is out of the fight.",
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
