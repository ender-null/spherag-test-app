import i18n from '@/i18n';

export const formatDate = (date: string, includeTime = false) => {
  return new Date(date).toLocaleString(i18n.locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    ...(includeTime ? { hour: 'numeric', minute: 'numeric' } : {}),
  });
};
