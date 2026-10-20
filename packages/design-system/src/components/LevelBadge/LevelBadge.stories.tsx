import type { Meta, StoryObj } from "@storybook/react-vite";
import { LevelBadge } from "./LevelBadge";

const meta = {
  title: "Components/LevelBadge",
  component: LevelBadge,
  args: { level: 9 },
  argTypes: {
    level: { control: { type: "number", min: 1, max: 20, step: 1 } },
  },
} satisfies Meta<typeof LevelBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  render: () => (
    <div className="cp-row">
      {[9, 10, 11, 12, 13, 14].map((level) => (
        <LevelBadge key={level} level={level} />
      ))}
    </div>
  ),
};
