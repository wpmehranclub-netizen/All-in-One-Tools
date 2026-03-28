import * as math from 'mathjs';

// Client-Side Execution Engine for Real-Time Tools
// This avoids hitting the Next.js server for basic Javascript operations

export const clientHandlers: Record<string, (payload: any) => any> = {
  
  // Word Counter calculates words, characters, sentences
  'word-counter': (payload: any) => {
    const text = payload.text || '';
    if (!text.trim()) {
      return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, readingTimeMinutes: 0 };
    }
    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.length > 0 ? 1 : 0);
    const readingTimeMinutes = Math.ceil(words / 200);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      readingTimeMinutes
    };
  },

  // Text Case Converter
  'text-case-converter': (payload: any) => {
    const text = payload.text || '';
    const caseType = payload.caseType || 'uppercase';

    let result = '';
    if (caseType === 'uppercase') result = text.toUpperCase();
    else if (caseType === 'lowercase') result = text.toLowerCase();
    else if (caseType === 'titlecase') {
      result = text.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    } else {
      result = text;
    }
    return { text: result };
  },

  // BMI Calculator
  'bmi-calculator': (payload: any) => {
    const weight = parseFloat(payload.weight);
    const heightCm = parseFloat(payload.height);

    if (isNaN(weight) || isNaN(heightCm) || heightCm <= 0 || weight <= 0) {
      return { 
        bmi: 0, 
        category: 'Invalid Input', 
        healthyWeightRange: 'N/A' 
      };
    }

    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    let category = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';

    const minHealthy = +(18.5 * (heightM * heightM)).toFixed(1);
    const maxHealthy = +(24.9 * (heightM * heightM)).toFixed(1);

    return {
      bmi,
      category,
      healthyWeightRange: `${minHealthy}kg - ${maxHealthy}kg`
    };
  },

  // JSON Formatter 
  'json-formatter': (payload: any) => {
    const jsonString = payload.jsonString || '';
    if (!jsonString.trim()) {
      return { formatted: '' };
    }
    try {
      const parsed = JSON.parse(jsonString);
      return { formatted: JSON.stringify(parsed, null, 2) };
    } catch (e: any) {
      return { formatted: `Error: Invalid JSON.\n\n${e.message}` };
    }
  },

  // Basic Calculator
  'basic-calculator': (payload: any) => {
    const num1 = parseFloat(payload.num1);
    const num2 = parseFloat(payload.num2);
    const operator = payload.operator;

    if (isNaN(num1) || isNaN(num2)) return { result: 'Error: Valid numbers required' };

    let result = 0;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': 
        if (num2 === 0) return { result: 'Error: Cannot divide by zero' };
        result = num1 / num2; 
        break;
      default: return { result: 'Error: Invalid operator' };
    }

    return { result };
  },

  // Scientific Calculator
  'scientific-calculator': (payload: any) => {
    const expression = payload.expression || '';
    if (!expression.trim()) return { result: '', equation: '' };
    try {
      const result = math.evaluate(expression);
      return { result, equation: expression };
    } catch (e: any) {
      return { result: 'Error: Invalid mathematical expression', equation: expression };
    }
  },

  // Age Calculator
  'age-calculator': (payload: any) => {
    const dob = payload.dob;
    if (!dob) return { Years: '', Months: '', Days: '', 'Next Birthday': '' };

    const birthDate = new Date(dob);
    const today = new Date();

    if (isNaN(birthDate.getTime())) return { Years: 'Error', Months: 'Invalid Date', Days: '', 'Next Birthday': '' };

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
  },

  // Percentage Calculator
  'percentage-calculator': (payload: any) => {
    const value = parseFloat(payload.value);
    const total = parseFloat(payload.total);

    if (isNaN(value) || isNaN(total)) return { Value: '', Total: '', Percentage: '' };
    if (total === 0) return { Value: value.toString(), Total: '0', Percentage: 'Error: Divide by 0' };

    const percentage = (value / total) * 100;
    
    return {
      Value: value.toString(),
      Total: total.toString(),
      Percentage: `${percentage.toFixed(2)}%`
    };
  },

  // Discount Calculator
  'discount-calculator': (payload: any) => {
    const price = parseFloat(payload.price);
    let discountPercent = parseFloat(payload.discountPercent);
    let taxPercent = parseFloat(payload.taxPercent || '0');

    if (isNaN(price)) return { 'Original Price': '', 'Discount Amount': '', 'Tax Amount': '', 'Final Price': '' };
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
  },

  // Currency Converter
  'currency-converter': async (payload: any) => {
    const amount = parseFloat(payload.amount);
    const from = payload.from?.toUpperCase() || '';
    const to = payload.to?.toUpperCase() || '';

    if (isNaN(amount) || amount <= 0) return { Error: 'Amount must be greater than 0' };
    if (!from || !to) return { Error: 'Please provide both From and To currencies' };

    if (from === to) {
      return {
        'Conversion': `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`,
        'Exchange Rate': '1.0000',
        'Data Source': 'Frankfurter API'
      };
    }

    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      if (!response.ok) {
        if (response.status === 404) return { Error: 'Invalid or unsupported currencies.' };
        return { Error: 'API Error. Please try again.' };
      }
      const data = await response.json();
      
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
        return { Error: `Currency ${to} is not supported.` };
      }
    } catch (e: any) {
      return { Error: 'Network Error while connecting to Frankfurter API.' };
    }
  },

  // BMR Calculator
  'bmr-calculator': (payload: any) => {
    const age = parseFloat(payload.age);
    const weight = parseFloat(payload.weight);
    const height = parseFloat(payload.height);
    const gender = payload.gender; 

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      return { Error: 'Age, weight, and height must be valid numbers' };
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
  },

  // Ovulation Calculator
  'ovulation-calculator': (payload: any) => {
    const { lastPeriod, cycleLength } = payload;
    if (!lastPeriod || !cycleLength) return { Error: 'Last period date and cycle length are required' };

    const cycleDays = parseInt(cycleLength, 10);
    if (isNaN(cycleDays) || cycleDays < 20 || cycleDays > 45) {
      return { Error: 'Cycle length must be between 20 and 45 days' };
    }

    const lmp = new Date(lastPeriod);
    if (isNaN(lmp.getTime())) return { Error: 'Invalid date provided' };

    const nextPeriod = new Date(lmp.getTime() + cycleDays * 24 * 60 * 60 * 1000);
    const ovulationDate = new Date(nextPeriod.getTime() - 14 * 24 * 60 * 60 * 1000);

    const fertileStart = new Date(ovulationDate.getTime() - 5 * 24 * 60 * 60 * 1000);
    const fertileEnd = new Date(ovulationDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    const pregnancyTest = new Date(nextPeriod.getTime() + 1 * 24 * 60 * 60 * 1000);

    return {
      'Estimated Ovulation': ovulationDate.toDateString(),
      'Fertile Window': `${fertileStart.toDateString()} to ${fertileEnd.toDateString()}`,
      'Next Expected Period': nextPeriod.toDateString(),
      'Pregnancy Test Date': `From ${pregnancyTest.toDateString()}`
    };
  },

  // Time Zone Converter
  'time-zone-converter': (payload: any) => {
    const { time, fromTz, toTz } = payload;
    if (!time || !fromTz || !toTz) return { Error: 'Please select a valid time and both timezones' };

    try {
      const today = new Date();
      const [hours, minutes] = time.split(':');
      const sourceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(hours), parseInt(minutes));

      const d1 = new Date();
      const tzFromStr = d1.toLocaleString('en-US', { timeZone: fromTz });
      const tzToStr = d1.toLocaleString('en-US', { timeZone: toTz });
      
      const dFrom = new Date(tzFromStr);
      const dTo = new Date(tzToStr);
      const diffMs = dTo.getTime() - dFrom.getTime();

      const targetTimeMs = sourceDate.getTime() + diffMs;
      const targetDateObj = new Date(targetTimeMs);
      
      const displayTime = targetDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      return {
        'Source Time': `${time} in ${fromTz}`,
        'Converted Time': `${displayTime} in ${toTz}`,
        'Time Difference': `${(diffMs / 3600000).toFixed(1)} Hours`
      };
    } catch (e: any) {
      return { Error: 'Invalid time zone selection' };
    }
  }
};
