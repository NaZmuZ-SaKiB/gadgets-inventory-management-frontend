export const formatCurrency = (value: number) => {
  const number = new Intl.NumberFormat("en-US").format(value);

  return `${number}/-`;
};
