import '@/styles/index.scss';
import { debounce, onClickOutside } from '@/utils';
import type { NpBaseSelectConfig, NpBaseSelectOption } from '@/types';
import NpApi from '@/api';

const KEY_CODES = ['Enter'];

const SELECTORS = {
  option: 'np-select__option',
};

const ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 7a.956.956 0 01-.657-.256l-5.57-5.25a.839.839 0 010-1.237.968.968 0 011.312 0L6.5 4.888 11.415.257a.968.968 0 011.313 0 .839.839 0 010 1.237l-5.572 5.25A.956.956 0 016.5 7z"/></svg>`;
const LOADING_ICON = `<span class="spinner"><span></span><span></span><span></span><span></span></span>`;

export class NpBaseSelect {
  private options: NpBaseSelectOption[];
  private filtered: NpBaseSelectOption[];
  private open: boolean;
  private value: string;
  private button: NpBaseSelectConfig['button'];
  private input: NpBaseSelectConfig['input'];
  private placeholder: NpBaseSelectConfig['placeholder'];
  private selected: string;
  private disabled: boolean;
  private loading: boolean;

  $root: HTMLElement;
  $wrapper: HTMLElement;
  $button: HTMLButtonElement;
  $input: HTMLInputElement;
  $select: HTMLDivElement;
  $placeholder: HTMLDivElement;

  getOption: NpBaseSelectConfig['getOption'];
  private onSelect?: NpBaseSelectConfig['onSelect'];
  private onInput?: NpBaseSelectConfig['onInput'];
  private onOpen?: NpBaseSelectConfig['onOpen'];
  private onMounted?: NpBaseSelectConfig['onMounted'];
  api: NpApi;

  constructor({
    root,
    button,
    input,
    options = [],
    getOption,
    onSelect = () => {},
    onInput = () => {},
    onOpen = () => {},
    onMounted = () => {},
    apiKey,
  }: NpBaseSelectConfig) {
    if (!root) {
      throw new TypeError(
        'NpSelect: root element is not passed or it is not valid',
      );
    }

    if (!apiKey) {
      console.error('NpSelect: apiKey is not passed');
    }

    this.options = options.map(item => getOption(item));
    this.filtered = options.map(item => getOption(item));
    this.open = false;
    this.value = '';
    this.selected = '';
    this.button = button;
    this.input = input;
    this.disabled = false;
    this.loading = false;

    this.$root = root;
    this.$wrapper = null;
    this.$button = null;
    this.$input = null;
    this.$select = null;
    this.$placeholder = null;

    this.getOption = getOption;
    this.onSelect = onSelect;
    this.onInput = onInput;
    this.onOpen = onOpen;
    this.onMounted = onMounted;

    this.api = new NpApi({ apiKey });

    this.build();
  }

  validate() {
    const isValid = !!this.selected;

    if (this.disabled) {
      return false;
    }

    this.$wrapper.ariaInvalid = `${!isValid}`;

    return isValid;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.$wrapper.ariaBusy = `${loading}`;
  }

  getLoading() {
    return this.loading;
  }

  setSelected(value: string) {
    this.selected = value;
    this.setValue(value);
  }

  getSelected() {
    return {
      value: this.selected,
      option: this.options.find(option => option.value === this.selected),
    };
  }

  setValue(value: string = '') {
    if (!value.length) {
      this.selected = '';

      return;
    }

    if (this.filtered.some(option => option.value === value)) {
      this.selected = value;
      this.setButtonText(this.selected);
    }

    this.value = value;
    this.$input.value = value;

    this.createSelectOptions();
  }

  getValue() {
    return this.value;
  }

  setOptions(options: Record<any, any>[]) {
    this.options = options.map(item => this.getOption(item));
    this.filtered = options.map(item => this.getOption(item));

    this.setEmptyState(this.filtered);

    this.createSelectOptions();
  }

  getOptions() {
    return this.options;
  }

  setFiltered(filtered: NpBaseSelectOption[]) {
    this.filtered = filtered;

    this.setEmptyState(this.filtered);

    this.createSelectOptions();
  }

  getFiltered() {
    return this.filtered;
  }

  setOpen(open: boolean) {
    if (open) {
      this.handleOpen();
    } else {
      this.handleClose();
    }

    this.open = open;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
    this.$button.disabled = disabled;

    this.setButtonText(this.button.text || '');

    this.$wrapper.ariaDisabled = `${disabled}`;
  }

  private build() {
    const $wrapper = this.createSelect();

    if (this.options) {
      this.createSelectOptions();
    }

    this.$wrapper = $wrapper;
    this.$root.replaceChildren($wrapper);

    this.onMounted?.(this);

    onClickOutside(this.$root, () => this.setOpen(false));
  }

  private createSelect() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('np-select');

    const $button = this.createButton();

    this.$button = $button;

    $wrapper.appendChild($button);

    const $input = document.createElement('input');
    $input.classList.add('np-select__input');
    $input.name = this.input.name || '';
    $input.placeholder = this.input.placeholder || '';
    $input.autocomplete = 'off';

    const debouncedHandleInput = debounce(e => this.handleInput(e));

    $input.addEventListener('input', debouncedHandleInput);
    $input.addEventListener('keydown', e => {
      if (e.code === 'ArrowDown') {
        this.$select.querySelector<HTMLDivElement>(SELECTORS.option)!.focus();
      }
    });
    $wrapper.appendChild($input);
    this.$input = $input;

    const $select = document.createElement('div');
    $select.classList.add('np-select__box', 'empty');
    $wrapper.append($select);
    this.$select = $select;

    const $placeholder = document.createElement('div');
    $placeholder.classList.add('np-select__placeholder');
    $placeholder.textContent = this.placeholder?.text || 'Nothing found.';
    $wrapper.append($placeholder);
    this.$placeholder = $placeholder;

    return $wrapper;
  }

  private createSelectOptions() {
    this.$select.replaceChildren();

    this.filtered.forEach(item => {
      const $option = document.createElement('div');
      $option.classList.add('np-select__option');
      $option.textContent = item.label;
      $option.tabIndex = 0;

      if (item.value === this.value) {
        $option.classList.add('selected');
      }

      $option.addEventListener('click', () => this.handleSelect($option, item));
      $option.addEventListener('keydown', e => {
        if (KEY_CODES.includes(e.code)) {
          this.handleSelect($option, item);
        }
      });

      this.$select.appendChild($option);
    });
  }

  private createButton() {
    const $button = document.createElement('button');
    $button.classList.add('np-select__button');
    $button.type = 'button';
    $button.addEventListener('click', () => {
      if (this.open) {
        this.handleClose();
      } else {
        this.handleOpen();
      }
    });

    const $text = document.createElement('span');
    $text.classList.add('text');
    $text.textContent = this.button.text || '';
    $button.appendChild($text);

    const $icon = document.createElement('span');
    $icon.classList.add('icon');
    $icon.innerHTML = ARROW_ICON;
    $button.appendChild($icon);

    const $spinner = document.createElement('span');
    $spinner.classList.add('loading');
    $spinner.innerHTML = LOADING_ICON;
    $button.appendChild($spinner);

    return $button;
  }

  private setButtonText(text: string) {
    const $text = this.$button.querySelector('span.text');
    $text.textContent = text;
  }

  private setEmptyState(options: NpBaseSelectOption[]) {
    if (!options.length) {
      this.$select.classList.add('empty');
      this.$placeholder.classList.add('empty');
    } else {
      this.$select.classList.remove('empty');
      this.$placeholder.classList.remove('empty');
    }
  }

  private handleOpen() {
    const openable = this.onOpen?.(this);

    if (openable === false) {
      this.setDisabled(true);
    }

    if (this.disabled) return;

    this.$wrapper.classList.add('open');
    this.$input.focus();
    this.open = true;
  }

  private handleClose() {
    this.$wrapper.classList.remove('open');
    this.open = false;
  }

  private handleSelect($option: HTMLDivElement, item: NpBaseSelectOption) {
    this.$root
      .querySelectorAll(SELECTORS.option)
      .forEach(option => option.classList.remove('selected'));

    $option.classList.add('selected');

    this.handleClose();

    this.setButtonText(item.label);

    this.selected = item.value;
    this.value = item.value;
    this.$input.value = item.value;

    this.onSelect?.(item, this);
    this.validate();
  }

  private handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.onInput?.(value, this);
    this.value = value;

    if (this.selected !== value) {
      this.selected = '';
      this.createSelectOptions();
    }
  }
}
