export const getTotalPrice = ({ price, signal }: { price?: number; signal?: number }) => {
  if (!price) return '-';
  if (!signal) return price;
  return (price - signal).toFixed(2);
};
