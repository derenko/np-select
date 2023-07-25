import type { NpBaseSelect } from '@/base-select';
import {
  NpGetSettlementsResponseAddress,
  NpGetWarehousesResponseData,
} from './np-api';

export interface NpBaseSelectOption {
  value: string;
  label: string;
}

type NpBaseSelectSharedProperties = {
  root: HTMLElement;
  button?: {
    text?: string;
    icon?: string;
  };
  input?: {
    name?: string;
    placeholder?: string;
  };
  placeholder?: {
    text: string;
  };
  options?: NpBaseSelectOption[];
  apiKey?: string;
};

type NpBaseSelectSharedMethods = {
  getOption: (value: Record<any, any>) => NpBaseSelectOption;
  onInput?: (value: string, select: NpBaseSelect) => void;
  onOpen?: (select: NpBaseSelect) => any;
  onMounted?: (select: NpBaseSelect) => void;
  onSelect?: (item: NpBaseSelectOption, select: NpBaseSelect) => void;
};

export type NpBaseSelectConfig = NpBaseSelectSharedProperties &
  NpBaseSelectSharedMethods & {
    onSelect?: (item: NpBaseSelectOption, select: NpBaseSelect) => void;
  };

export type NpCitySelectConfig = Omit<NpBaseSelectConfig, 'getOption'> & {
  onSelect?: (item: NpBaseSelectOption, select: NpBaseSelect) => void;
  getOption?: (item: NpGetSettlementsResponseAddress) => NpBaseSelectOption;
};

export type NpWarehouseSelectConfig = Omit<NpBaseSelectConfig, 'getOption'> & {
  city?: string;
  getOption?: (item: NpGetWarehousesResponseData) => NpBaseSelectOption;
};
