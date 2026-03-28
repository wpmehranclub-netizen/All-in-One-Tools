module.exports = async (payload) => {
  const { lastPeriod, cycleLength } = payload;
  if (!lastPeriod || !cycleLength) throw new Error('Last period date and cycle length are required');

  const cycleDays = parseInt(cycleLength, 10);
  if (isNaN(cycleDays) || cycleDays < 20 || cycleDays > 45) {
    throw new Error('Cycle length must be between 20 and 45 days');
  }

  const lmp = new Date(lastPeriod);
  if (isNaN(lmp.getTime())) throw new Error('Invalid date provided');

  // Ovulation is roughly 14 days before the NEXT period
  // Next period = lmp + cycleDays
  const nextPeriod = new Date(lmp.getTime() + cycleDays * 24 * 60 * 60 * 1000);
  const ovulationDate = new Date(nextPeriod.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Fertile window is historically 5 days leading up to ovulation and the day after
  const fertileStart = new Date(ovulationDate.getTime() - 5 * 24 * 60 * 60 * 1000);
  const fertileEnd = new Date(ovulationDate.getTime() + 1 * 24 * 60 * 60 * 1000);
  const pregnancyTest = new Date(nextPeriod.getTime() + 1 * 24 * 60 * 60 * 1000);

  return {
    'Estimated Ovulation': ovulationDate.toDateString(),
    'Fertile Window': `${fertileStart.toDateString()} to ${fertileEnd.toDateString()}`,
    'Next Expected Period': nextPeriod.toDateString(),
    'Pregnancy Test Date': `From ${pregnancyTest.toDateString()}`
  };
};
