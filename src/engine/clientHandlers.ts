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
  },

  // Loan EMI Calculator
  'loan-emi-calculator': (payload: any) => {
    const P = parseFloat(payload.principal);
    const R = parseFloat(payload.interest) / 12 / 100;
    const N = parseFloat(payload.tenure);

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || N <= 0) {
      return { 'Monthly EMI': '0.00', 'Total Interest': '0.00', 'Total Payment': '0.00' };
    }

    if (R === 0) {
      return {
        'Monthly EMI': `$${(P / N).toFixed(2)}`,
        'Total Interest': '$0.00',
        'Total Payment': `$${P.toFixed(2)}`,
      };
    }

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return {
      'Monthly EMI': `$${emi.toFixed(2)}`,
      'Total Interest': `$${totalInterest.toFixed(2)}`,
      'Total Amount': `$${totalPayment.toFixed(2)}`,
    };
  },

  // Date Difference Calculator
  'date-difference-calculator': (payload: any) => {
    const start = new Date(payload.startDate);
    const end = new Date(payload.endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { Error: 'Invalid dates provided.' };
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      'Total Days': `${diffDays} days`,
      'Total Weeks': `${(diffDays / 7).toFixed(1)} weeks`,
      'Total Months (Approx)': `${(diffDays / 30.417).toFixed(1)} months`,
      'Total Years (Approx)': `${(diffDays / 365.25).toFixed(2)} years`
    };
  },

  // Unit Converter
  'unit-converter': (payload: any) => {
    const val = parseFloat(payload.value);
    const fromUnit = payload.fromUnit;
    const toUnit = payload.toUnit;

    if (isNaN(val)) return { Error: 'Valid number required for value.' };
    
    const lengthMap: any = {
      'Meters': 1,
      'Kilometers': 1000,
      'Miles': 1609.34,
      'Feet': 0.3048,
    };
    
    const massMap: any = {
      'Kilograms': 1,
      'Pounds': 0.453592,
    };

    if (lengthMap[fromUnit] && lengthMap[toUnit]) {
      const inMeters = val * lengthMap[fromUnit];
      const result = inMeters / lengthMap[toUnit];
      return { Result: `${val} ${fromUnit} = ${result.toFixed(4)} ${toUnit}` };
    } else if (massMap[fromUnit] && massMap[toUnit]) {
      const inKg = val * massMap[fromUnit];
      const result = inKg / massMap[toUnit];
      return { Result: `${val} ${fromUnit} = ${result.toFixed(4)} ${toUnit}` };
    } else {
      return { Error: `Cannot convert ${fromUnit} to ${toUnit}` };
    }
  },

  // Calorie Calculator
  'calorie-calculator': (payload: any) => {
    const age = parseFloat(payload.age);
    const weight = parseFloat(payload.weight);
    const height = parseFloat(payload.height);
    const gender = payload.gender; 
    const activity = payload.activity;

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
       return { Error: 'Valid age, weight, and height are required.' };
    }

    let bmr = 0;
    if (gender === 'Male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let multiplier = 1.2;
    if (activity === 'Lightly Active') multiplier = 1.375;
    else if (activity === 'Active') multiplier = 1.55;
    else if (activity === 'Very Active') multiplier = 1.725;

    const tdee = bmr * multiplier;

    return {
      'Maintain Weight': `${Math.round(tdee)} calories/day`,
      'Mild Weight Loss (~0.25 kg/wk)': `${Math.round(tdee - 250)} calories/day`,
      'Weight Loss (~0.5 kg/wk)': `${Math.round(tdee - 500)} calories/day`,
      'Extreme Weight Loss (~1 kg/wk)': `${Math.round(tdee - 1000)} calories/day`
    };
  },

  // Ideal Weight Calculator
  'ideal-weight-calculator': (payload: any) => {
    const height = parseFloat(payload.height);
    const gender = payload.gender;

    if (isNaN(height) || height < 100) return { Error: 'Valid height > 100cm required.' };

    let idealWeight = 0;
    const heightInches = height / 2.54;
    
    if (gender === 'Male') {
      idealWeight = 50 + 2.3 * (heightInches - 60);
    } else {
      idealWeight = 45.5 + 2.3 * (heightInches - 60);
    }

    let robinsonWeight = 0;
    if (gender === 'Male') {
      robinsonWeight = 52 + 1.9 * (heightInches - 60);
    } else {
      robinsonWeight = 49 + 1.7 * (heightInches - 60);
    }

    return {
      'Devine Formula (Standard)': `${idealWeight.toFixed(1)} kg`,
      'Robinson Formula': `${robinsonWeight.toFixed(1)} kg`,
      'Healthy Range': `${((height/100)*(height/100)*18.5).toFixed(1)} - ${((height/100)*(height/100)*24.9).toFixed(1)} kg`
    };
  }
};
