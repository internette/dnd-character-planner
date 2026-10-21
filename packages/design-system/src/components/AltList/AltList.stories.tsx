import type { Meta, StoryObj } from "@storybook/react-vite";
import { AltList } from "./AltList";

const meta = {
  title: "Components/AltList",
  component: AltList,
  args: {
    items: [
      { name: "Otto's Irresistible Dance", text: "the musician's pick, but it only hits one target." },
      { name: "Mass Suggestion", text: "no concentration, up to twelve creatures." },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AltList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomJoiner: Story = {
  args: {
    items: [{ name: "Shatter", joiner: ", ", text: "upcast: your existing strike option until this arrives." }],
  },
};
