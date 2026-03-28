module.exports = async (payload) => {
  const price = parseFloat(payload.price);
  let discountPercent = parseFloat(payload.discountPercent);
  let taxPercent = parseFloat(payload.taxPercent || '0');

  if (isNaN(price)) throw new Error('Original Price must be a valid number');
  if (isNaN(discountPercent)) discountPercent = 0;
  if (isNaN(taxPercent)) taxPercent = 0;

  const discountAmount = price * (discountPercent / 100);
  const priceAfterDiscount = price - discountAmount;
  const taxAmount = priceAfterDiscount * (taxPercent / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  return {
    'Original Price': `$${price.toFixed(2)}`,
    'Discount Amount': `-$${discountAmount.toFixed(2)}`,
    'Tax Amount': `+$${taxAmount.toFixed(2)}`,
    'Final Price': `$${finalPrice.toFixed(2)}`
  };
};
