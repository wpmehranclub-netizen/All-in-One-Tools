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
  }

};
