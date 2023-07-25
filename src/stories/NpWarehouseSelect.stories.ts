import { NpWarehouseSelect as Select } from '@/index';
import { Preview, StoryObj } from '@storybook/html';
import {
  defaultArgTypes,
  defaultOnSelectMountedCallback,
  onMounted,
} from './helpers';

const template = `
  <div id="warehouse"></div>
`;

export default {
  title: 'NpSelect/NpWarehouseSelect',
  argTypes: {
    ...defaultArgTypes,
    city: {
      description: 'If presented select will fetch warehouses in a given city',
    },
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
        root: document.querySelector('#warehouse'),
        city: args.city,
        onMounted: select => defaultOnSelectMountedCallback(select, args),
      }),
    );

    return template;
  },
} as Preview;

export const NpWarehouseSelect: StoryObj = {
  args: {
    apiKey: '',
    city: '',
    input: {
      name: 'warehouse',
      placeholder: 'Select Warehouse',
    },
    button: {
      text: 'Select Warehouse',
    },
    disabled: false,
    empty: false,
    loading: false,
  },
};
