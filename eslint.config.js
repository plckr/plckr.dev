// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
//  @ts-check
import { tanstackConfig } from '@tanstack/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [...tanstackConfig, ...storybook.configs['flat/recommended']];
