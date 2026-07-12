type Price = string | number;

const formatCurrency = (price: Price) => {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));
};

export default formatCurrency;
