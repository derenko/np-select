import { NpBaseSelect } from '@/base-select';
import { multiWordSearch } from './utils';
import type { NpCitySelectConfig, NpWarehouseSelectConfig } from '@/types';

const getNpCitySelectOption: NpCitySelectConfig['getOption'] = item => ({
  label: item.Present,
  value: item.MainDescription,
});

export const NpCitySelect = (config: NpCitySelectConfig) => {
  const getOption: NpCitySelectConfig['getOption'] =
    config.getOption || getNpCitySelectOption;

  return new NpBaseSelect({
    root: config.root,
    apiKey: config.apiKey,
    button: {
      text: config.button?.text || 'Select City',
    },
    input: {
      name: config.input?.name || 'city',
      placeholder: config.input?.placeholder || 'Select City',
    },
    placeholder: {
      text:
        config.placeholder?.text ||
        'No cities found. Try to change your input.',
    },
    onMounted: config.onMounted,
    onSelect: async (item, select) => {
      select.setSelected(item.value);

      config.onSelect?.(item, select);
    },
    onInput: async (value, select) => {
      if (value.length >= 3) {
        select.setLoading(true);
        const addresses = await select.api.getNpCities(value);
        select.setOptions(addresses);
        select.setLoading(false);
      }
    },
    getOption,
  });
};

const getNpWarehouseSelectOption: NpWarehouseSelectConfig['getOption'] =
  item => ({
    label: `№ ${item.Number}, ${item.ShortAddress}`,
    value: `№ ${item.Number}, ${item.ShortAddress}`,
  });

export const NpWarehouseSelect = (config: NpWarehouseSelectConfig) => {
  const getOption = config.getOption || getNpWarehouseSelectOption;

  return new NpBaseSelect({
    root: config.root,
    apiKey: config.apiKey,
    button: {
      text: config.button?.text || 'Select Warehouse',
    },
    input: {
      name: config.input?.name || 'warehouse',
      placeholder: config.input?.placeholder || 'Select Warehouse',
    },
    placeholder: {
      text: config?.placeholder?.text || 'Nothing found.',
    },
    onMounted: async select => {
      if (config.city) {
        select.setLoading(true);
        const warehouses = await select.api.getNpWarehouses(config.city);
        select.setOptions(warehouses);
        select.setLoading(false);
        select.setOpen(true);
      }

      config.onMounted?.(select);
    },
    onSelect: async (item, select) => {
      select.setSelected(item.value);
      config.onSelect?.(item, select);
    },
    onInput: async (value, select) => {
      const options = select.getOptions();
      const filtered = multiWordSearch(options, value);
      select.setFiltered(filtered);
    },
    onOpen: config.onOpen,
    getOption,
  });
};

export const utils = {
  validateMultiple: (selects: NpBaseSelect[]) => {
    return selects.map(select => select.validate()).every(value => value);
  },
};
