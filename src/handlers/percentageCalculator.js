module.exports = async (payload) => {
  const value = parseFloat(payload.value);
  const total = parseFloat(payload.total);

  if (isNaN(value) || isNaN(total)) throw new Error('Value and Total must be valid numbers');
  if (total === 0) throw new Error('Total cannot be zero');

  const percentage = (value / total) * 100;
  
  return {
    Value: value.toString(),
    Total: total.toString(),
    Percentage: `${percentage.toFixed(2)}%`
  };
};
