import type { Meta, StoryObj } from "@storybook/react-vite";
import { PhaseTag } from "./PhaseTag";

const meta = {
  title: "Components/PhaseTag",
  component: PhaseTag,
  args: { phase: "gather" },
} satisfies Meta<typeof PhaseTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gather: Story = {};

export const Hold: Story = {
  args: { phase: "hold" },
};

export const Strike: Story = {
  args: { phase: "strike" },
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <div className="cp-row">
      <PhaseTag {...args} phase="gather" />
      <PhaseTag {...args} phase="hold" />
      <PhaseTag {...args} phase="strike" />
    </div>
  ),
};

export const AllPhases: Story = {
  render: (args) => (
    <div className="cp-stack">
      <div className="cp-row">
        <PhaseTag {...args} phase="gather" size="md" />
        <PhaseTag {...args} phase="hold" size="md" />
        <PhaseTag {...args} phase="strike" size="md" />
      </div>
      <div className="cp-row">
        <PhaseTag {...args} phase="gather" size="sm" />
        <PhaseTag {...args} phase="hold" size="sm" />
        <PhaseTag {...args} phase="strike" size="sm" />
      </div>
    </div>
  ),
};
