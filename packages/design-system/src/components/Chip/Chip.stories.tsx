import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: { variant: "neutral", value: "5th-level spells" },
  argTypes: {
    variant: { control: "select", options: ["neutral", "instant", "concentration", "dm", "gather", "hold", "strike"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    value: { control: "text" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Instant: Story = {
  args: { variant: "instant", value: "Instant" },
};

export const Concentration: Story = {
  args: { variant: "concentration", value: "Concentration" },
};

export const Dm: Story = {
  name: "DM",
  args: { variant: "dm", value: "Ask your DM" },
};

export const Gather: Story = {
  args: { variant: "gather", size: "md", value: "Gather" },
};

export const Hold: Story = {
  args: { variant: "hold", size: "md", value: "Hold" },
};

export const Strike: Story = {
  args: { variant: "strike", size: "md", value: "Strike" },
};

export const AllFacts: Story = {
  render: () => (
    <div className="cp-row">
      <Chip value="5th-level spells" />
      <Chip value="Song of Rest d8" />
      <Chip variant="instant" value="Instant" />
      <Chip variant="concentration" value="Concentration" />
      <Chip variant="instant" value="No concentration" />
      <Chip variant="dm" value="Ask your DM" />
    </div>
  ),
};

export const PhaseSmall: Story = {
  render: () => (
    <div className="cp-row">
      <Chip variant="gather" />
      <Chip variant="hold" />
      <Chip variant="strike" />
    </div>
  ),
};

export const AllPhases: Story = {
  render: () => (
    <div className="cp-stack">
      <div className="cp-row">
        <Chip variant="gather" size="md" />
        <Chip variant="hold" size="md" />
        <Chip variant="strike" size="md" />
      </div>
      <div className="cp-row">
        <Chip variant="gather" />
        <Chip variant="hold" />
        <Chip variant="strike" />
      </div>
    </div>
  ),
};
