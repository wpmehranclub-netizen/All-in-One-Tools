module.exports = async (payload) => {
  const age = parseFloat(payload.age);
  const weight = parseFloat(payload.weight);
  const height = parseFloat(payload.height);
  const gender = payload.gender; // Male or Female

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    throw new Error('Age, weight, and height must be valid numbers');
  }

  let bmr = 0;
  if (gender === 'Male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  return {
    'BMR (Basal Metabolic Rate)': `${Math.round(bmr)} Calories/day`,
    'Sedentary (little to no exercise)': `${Math.round(bmr * 1.2)} Calories/day`,
    'Light exercise (1-3 days/week)': `${Math.round(bmr * 1.375)} Calories/day`,
    'Moderate exercise (3-5 days/week)': `${Math.round(bmr * 1.55)} Calories/day`,
    'Heavy exercise (6-7 days/week)': `${Math.round(bmr * 1.725)} Calories/day`,
    'Very heavy exercise (twice/day)': `${Math.round(bmr * 1.9)} Calories/day`
  };
};
