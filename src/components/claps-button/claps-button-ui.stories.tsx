import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ClapsButtonUi } from './claps-button-ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ClapsButton/Button',
  component: ClapsButtonUi,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    progress: {
      control: 'number',
      name: 'Progress Percentage'
    }
  },
  args: {
    onClick: fn()
  }
} satisfies Meta<typeof ClapsButtonUi>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    progress: 0.1,
    hidden: false,
    count: 20
  }
};
