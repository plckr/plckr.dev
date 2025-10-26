import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressCircle } from './progress-circle';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ClapsButton/ProgressCircle',
  component: ProgressCircle,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    percentage: {
      control: 'number',
      name: 'Progress Percentage',
      originPosition: {
        control: 'select',
        name: 'Origin Position',
        options: ['top', 'bottom', 'left', 'right']
      }
    }
  },
  args: {}
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    percentage: 10,
    originPosition: 'bottom'
  }
};
