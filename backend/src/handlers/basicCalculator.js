module.exports = async (payload) => {
  const num1 = parseFloat(payload.num1);
  const num2 = parseFloat(payload.num2);
  const operator = payload.operator;

  if (isNaN(num1) || isNaN(num2)) throw new Error('Valid numbers are required');

  let result = 0;
  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': 
      if (num2 === 0) throw new Error('Cannot divide by zero');
      result = num1 / num2; 
      break;
    default: throw new Error('Invalid operator');
  }

  return { result };
};
