const axios = require('axios');

module.exports = async (payload) => {
  const amount = parseFloat(payload.amount);
  const from = payload.from?.toUpperCase() || '';
  const to = payload.to?.toUpperCase() || '';

  if (isNaN(amount) || amount <= 0) {
    throw new Error('Please enter a valid amount greater than 0');
  }
  if (!from || !to) {
    throw new Error('Please provide both From and To currencies');
  }

  if (from === to) {
    return {
      'Conversion': `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`,
      'Exchange Rate': '1.0000',
      'Data Source': 'Frankfurter API'
    };
  }

  try {
    const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = response.data;
    
    if (data.rates && data.rates[to]) {
      const convertedValue = data.rates[to];
      const rate = convertedValue / amount;
      return {
        'Conversion': `${amount.toFixed(2)} ${from} = ${convertedValue.toFixed(2)} ${to}`,
        'Exchange Rate': `1 ${from} = ${rate.toFixed(4)} ${to}`,
        'As of Date': data.date,
        'Data Source': 'Frankfurter API'
      };
    } else {
      throw new Error(`Currency ${to} is not supported by the API.`);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('One or both of the provided currencies are invalid/unsupported.');
    }
    throw new Error('Failed to fetch conversion rates. Please try again later.');
  }
};
