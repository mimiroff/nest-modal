export const requiredRules = [(value: string) => !!value || 'Required.'];

export const emailRules = [
  ...requiredRules,
  (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid E-Mail.';
  },
];

export const passwordRules = [
  ...requiredRules,
  (value: string) => (value || '').length >= 8 || 'Min 8 characters',
  (value: string) => (value || '').length <= 20 || 'Max 20 characters',
];
