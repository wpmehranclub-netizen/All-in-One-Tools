module.exports = async (payload) => {
  const { weight, height } = payload;
  if (!weight || !height) throw new Error('Weight and height are required');

  // weight in kg, height in cm
  const heightM = parseFloat(height) / 100;
  const bmi = parseFloat((parseFloat(weight) / (heightM * heightM)).toFixed(1));

  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal weight';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obese';

  return { bmi, category };
};
