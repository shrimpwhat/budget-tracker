export const CurrencyString = (value: number) => {
  return value.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
};
