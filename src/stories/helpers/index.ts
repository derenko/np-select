export const onMounted = (callback: () => any) => {
  setTimeout(callback, 0);
};

export const defaultOnSelectMountedCallback = (select, args) => {
  if (args.disabled) {
    select.setDisabled(args.disabled);
  }

  if (args.loading) {
    select.setLoading(args.loading);
  }

  if (args.open) {
    select.setOpen(true);
  }

  if (args.empty) {
    select.setOptions([]);
    select.setOpen(true);
  }
};

export const defaultArgTypes = {
  apiKey: {
    control: 'text',
    required: true,
    description: 'Your NovaPoshta API key',
  },
  root: {
    description: 'Root HTMLElement',
    control: null,
  },
  button: {
    description: 'Settings for select button',
  },
  input: {
    description: 'Settiongs for select input',
  },
  disabled: {
    description: 'Is select disabled',
  },
  loading: {
    description: 'Is select disabled',
  },
};
