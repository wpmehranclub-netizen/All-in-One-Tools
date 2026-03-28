module.exports = async (payload) => {
  const { time, fromTz, toTz } = payload;
  if (!time || !fromTz || !toTz) {
    throw new Error('Please select a valid time and both timezones');
  }

  try {
    const today = new Date();
    // parse time (HH:MM)
    const [hours, minutes] = time.split(':');
    const sourceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(hours), parseInt(minutes));

    // Convert assuming sourceDate is currently in local time, we map to fromTz
    const formatterFrom = new Intl.DateTimeFormat('en-US', { timeZone: fromTz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
    const formatterTo = new Intl.DateTimeFormat('en-US', { timeZone: toTz, timeStyle: 'medium', dateStyle: 'full' });

    // Since JS Dates are tricky with arbitrary timezones, we construct a fake string
    const stringTime = `${sourceDate.getFullYear()}-${(sourceDate.getMonth()+1).toString().padStart(2, '0')}-${sourceDate.getDate().toString().padStart(2, '0')}T${time}:00`;
    
    // We can use a dirty trick or just return a formatted string. It's best to use `Date.toLocaleString`
    // However, JS doesn't easily convert "time X in tz Y to time Z in tz W" without a library like luxon.
    // Instead we'll approximate it by taking the time offset difference.
    
    // Wait, Intl.DateTimeFormat 'timeZone' option formats A GIVEN UTC TIME into the target timezone.
    // We need to interpret the input time AS `fromTz`, then output it AS `toTz`.
    // It's much easier to just use `new Date()` differences if we have Luxon, but without Luxon:
    const d1 = new Date();
    const tzFromStr = d1.toLocaleString('en-US', { timeZone: fromTz });
    const tzToStr = d1.toLocaleString('en-US', { timeZone: toTz });
    
    const dFrom = new Date(tzFromStr);
    const dTo = new Date(tzToStr);
    const diffMs = dTo.getTime() - dFrom.getTime();

    // Now apply diffMs
    const targetTimeMs = sourceDate.getTime() + diffMs;
    const targetDateObj = new Date(targetTimeMs);
    
    const displayTime = targetDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      'Source Time': `${time} in ${fromTz}`,
      'Converted Time': `${displayTime} in ${toTz}`,
      'Time Difference': `${(diffMs / 3600000).toFixed(1)} Hours`
    };

  } catch (error) {
    throw new Error('Failed to convert timezones: ' + error.message);
  }
};
