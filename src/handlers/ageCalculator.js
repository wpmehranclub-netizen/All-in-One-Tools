module.exports = async (payload) => {
  const { dob } = payload;
  if (!dob) throw new Error('Date of Birth is required');

  const birthDate = new Date(dob);
  const today = new Date();

  if (isNaN(birthDate.getTime())) throw new Error('Invalid date format');

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    Years: years.toString(),
    Months: months.toString(),
    Days: days.toString(),
    'Next Birthday': `${diffDays} days away`
  };
};
