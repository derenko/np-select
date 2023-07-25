import { NpCitySelect, NpWarehouseSelect } from '@/index';
import { Preview, StoryObj } from '@storybook/html';
import { onMounted } from './helpers';

const template = `
  <div id="city" class="np-select-root"></div>
  <div id="warehouse" style="margin: 25px 0 0;"></div>
`;

export default {
  title: 'NpSelect/NpCitySelectAndNpWarehouseSelect',

  argTypes: {
    apiKey: { controll: 'text' },
  },
  render(args) {
    onMounted(() => {
      const warehouseSelect = NpWarehouseSelect({
        apiKey: args.apiKey,
        input: {
          name: 'warehouse',
          placeholder: 'Select Warehouse',
        },
        button: {
          text: 'Select Warehouse',
        },
        root: document.querySelector('#warehouse'),
        onMounted: select => select.setDisabled(true),
      });

      NpCitySelect({
        apiKey: args.apiKey,
        input: {
          name: 'city',
          placeholder: 'Select City',
        },
        button: {
          text: 'Select City',
        },
        root: document.querySelector('#city'),
        onSelect: async (item, select) => {
          const warehouses = await select.api.getNpWarehouses(item.value);

          warehouseSelect.setOptions(warehouses);
          warehouseSelect.setDisabled(false);
          warehouseSelect.setOpen(true);
        },
      });
    });

    return template;
  },
} as Preview;

export const NpCitySelectAndNpWarehouseSelect: StoryObj = {
  args: {
    apiKey: '',
  },
};
