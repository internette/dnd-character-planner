import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip, PHASE_LABEL, PHASE_VARIANT, type Phase } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: { variant: "green", value: "5th-level spells" },
  argTypes: {
    variant: { control: "select", options: ["green", "amber", "purple", "blue", "red"] },
    shape: { control: "inline-radio", options: ["rectangle", "pill"] },
    value: { control: "text" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const phases = Object.keys(PHASE_LABEL) as Phase[];

export const Green: Story = {};

export const Amber: Story = {
  args: { variant: "amber", value: "Concentration" },
};

export const Purple: Story = {
  args: { variant: "purple", value: "Ask your DM" },
};

export const Blue: Story = {
  args: { variant: "blue", value: "Gather" },
};

export const Red: Story = {
  args: { variant: "red", value: "Strike" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="cp-row">
      <Chip variant="green" value="Green" />
      <Chip variant="amber" value="Amber" />
      <Chip variant="purple" value="Purple" />
      <Chip variant="blue" value="Blue" />
      <Chip variant="red" value="Red" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="cp-row">
      <Chip value="Rectangle" />
      <Chip shape="pill" value="Pill" />
    </div>
  ),
};

export const AllFacts: Story = {
  render: () => (
    <div className="cp-row">
      <Chip value="5th-level spells" />
      <Chip value="Song of Rest d8" />
      <Chip variant="green" value="Instant" />
      <Chip variant="amber" value="Concentration" />
      <Chip variant="green" value="No concentration" />
      <Chip variant="purple" value="Ask your DM" />
    </div>
  ),
};

export const AllPhases: Story = {
  render: () => (
    <div className="cp-stack">
      <div className="cp-row">
        {phases.map((phase) => (
          <Chip key={phase} variant={PHASE_VARIANT[phase]} shape="pill" value={PHASE_LABEL[phase]} />
        ))}
      </div>
      <div className="cp-row">
        {phases.map((phase) => (
          <Chip key={phase} variant={PHASE_VARIANT[phase]} value={PHASE_LABEL[phase]} />
        ))}
      </div>
    </div>
  ),
};
