import i18n from "../i18n";

export const formatDate = (date: string) => {
  const dateObject = new Date(date);
  dateObject.setSeconds(0);
  dateObject.setMilliseconds(0);
  return dateObject.toLocaleString(i18n.locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
