const math = require('mathjs');

module.exports = async (payload) => {
  const { expression } = payload;
  if (!expression) throw new Error('Expression is required');

  try {
    const result = math.evaluate(expression);
    return { result, equation: expression };
  } catch (error) {
    throw new Error('Invalid mathematical expression');
  }
};
