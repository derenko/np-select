import { NpCitySelect as Select } from '@/index';
import { Preview, StoryObj } from '@storybook/html';
import {
  defaultArgTypes,
  defaultOnSelectMountedCallback,
  onMounted,
} from './helpers';

const template = `
  <div id="city"></div>
`;

export default {
  title: 'NpSelect/NpCitySelect',

  argTypes: {
    ...defaultArgTypes,
  },
  render(args) {
    onMounted(() =>
      Select({
        apiKey: args.apiKey,
        input: {
          name: args.input.name,
          placeholder: args.input.placeholder,
        },
        button: {
          text: args.button.text,
        },
        root: document.querySelector('#city'),
        onMounted: select => defaultOnSelectMountedCallback(select, args),
      }),
    );

    return template;
  },
} as Preview;

export const NpCitySelect: StoryObj = {
  args: {
    apiKey: '',
    input: {
      name: 'city',
      placeholder: 'Select City',
    },
    button: {
      text: 'Select City',
    },
    placeholder: {
      text: 'Nothing found.',
    },
    disabled: false,
    empty: false,
    loading: false,
  },
};
