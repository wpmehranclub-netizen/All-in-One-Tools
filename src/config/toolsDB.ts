export const categories = [
  { name: 'Text Tools', slug: 'text' },
  { name: 'Image Tools', slug: 'image' },
  { name: 'Health Calculators', slug: 'health' },
  { name: 'Developer Tools', slug: 'developer' },
  { name: 'Math & Logic', slug: 'math' },
  { name: 'Finance & Money', slug: 'finance' },
  { name: 'Date & Time', slug: 'datetime' },
  { name: 'Converters', slug: 'converters' },
  { name: 'AI Tools', slug: 'ai' }
];

export const tools = [
  {
    name: 'Word Counter',
    slug: 'word-counter',
    category_slug: 'text',
    config: {
      inputs: [{ name: 'text', type: 'textarea', label: 'Enter text here', required: true }],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Text Case Converter',
    slug: 'text-case-converter',
    category_slug: 'text',
    config: {
      inputs: [
        { name: 'text', type: 'textarea', label: 'Enter text', required: true },
        { name: 'caseType', type: 'select', label: 'Convert to', options: ['uppercase', 'lowercase', 'titlecase', 'spongebob', 'morse'], required: true }
      ],
      output: { type: 'text' },
      realtime: true
    }
  },
  {
    name: 'Image Resizer',
    slug: 'image-resizer',
    category_slug: 'image',
    config: {
      inputs: [
        { name: 'image', type: 'file', label: 'Upload Image', required: true, accept: 'image/*' },
        { name: 'width', type: 'number', label: 'Width (px)', required: true },
        { name: 'height', type: 'number', label: 'Height (px)', required: true }
      ],
      output: { type: 'image' },
      realtime: false
    }
  },
  {
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    category_slug: 'health',
    config: {
      inputs: [
        { name: 'weight', type: 'number', label: 'Weight (kg)', required: true },
        { name: 'height', type: 'number', label: 'Height (cm)', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    category_slug: 'developer',
    config: {
      inputs: [
        { name: 'jsonString', type: 'textarea', label: 'Raw JSON', required: true }
      ],
      output: { type: 'code' },
      realtime: true
    }
  },
  {
    name: 'Basic Calculator',
    slug: 'basic-calculator',
    category_slug: 'math',
    config: {
      inputs: [
        { name: 'num1', type: 'number', label: 'First Number', required: true },
        { name: 'operator', type: 'select', label: 'Operation', options: ['+', '-', '*', '/'], required: true },
        { name: 'num2', type: 'number', label: 'Second Number', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Scientific Calculator',
    slug: 'scientific-calculator',
    category_slug: 'math',
    config: {
      inputs: [
        { name: 'expression', type: 'text', label: 'Expression (e.g. sin(45) * 2 + log(10))', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Age Calculator',
    slug: 'age-calculator',
    category_slug: 'datetime',
    config: {
      inputs: [
        { name: 'dob', type: 'date', label: 'Date of Birth', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category_slug: 'math',
    config: {
      inputs: [
        { name: 'value', type: 'number', label: 'Value', required: true },
        { name: 'total', type: 'number', label: 'Total', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    category_slug: 'finance',
    config: {
      inputs: [
        { name: 'price', type: 'number', label: 'Original Price', required: true },
        { name: 'discountPercent', type: 'number', label: 'Discount (%)', required: true },
        { name: 'taxPercent', type: 'number', label: 'Tax Rate (%) (Optional)', required: false }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Loan EMI Calculator',
    slug: 'loan-emi-calculator',
    category_slug: 'finance',
    config: {
      inputs: [
        { name: 'principal', type: 'number', label: 'Principal Amount', required: true },
        { name: 'interest', type: 'number', label: 'Annual Interest Rate (%)', required: true },
        { name: 'tenure', type: 'number', label: 'Loan Tenure (Months)', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Currency Converter',
    slug: 'currency-converter',
    category_slug: 'converters',
    config: {
      inputs: [
        { name: 'amount', type: 'number', label: 'Amount', required: true },
        { name: 'from', type: 'text', label: 'From Currency (e.g. USD)', required: true },
        { name: 'to', type: 'text', label: 'To Currency (e.g. EUR, BTC)', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Unit Converter',
    slug: 'unit-converter',
    category_slug: 'converters',
    config: {
      inputs: [
        { name: 'value', type: 'number', label: 'Value', required: true },
        { name: 'fromUnit', type: 'select', label: 'From', options: ['Meters', 'Kilometers', 'Miles', 'Feet', 'Kilograms', 'Pounds'], required: true },
        { name: 'toUnit', type: 'select', label: 'To', options: ['Meters', 'Kilometers', 'Miles', 'Feet', 'Kilograms', 'Pounds'], required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Time Zone Converter',
    slug: 'time-zone-converter',
    category_slug: 'datetime',
    config: {
      inputs: [
        { name: 'time', type: 'time', label: 'Time', required: true },
        { name: 'fromTz', type: 'select', label: 'From Timezone', options: ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Kolkata', 'Australia/Sydney'], required: true },
        { name: 'toTz', type: 'select', label: 'To Timezone', options: ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Kolkata', 'Australia/Sydney'], required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    category_slug: 'datetime',
    config: {
      inputs: [
        { name: 'startDate', type: 'date', label: 'Start Date', required: true },
        { name: 'endDate', type: 'date', label: 'End Date', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Ovulation Calculator',
    slug: 'ovulation-calculator',
    category_slug: 'health',
    config: {
      inputs: [
        { name: 'lastPeriod', type: 'date', label: 'First day of last period', required: true },
        { name: 'cycleLength', type: 'number', label: 'Average Cycle Length (Days)', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Calorie Calculator',
    slug: 'calorie-calculator',
    category_slug: 'health',
    config: {
      inputs: [
        { name: 'age', type: 'number', label: 'Age', required: true },
        { name: 'gender', type: 'select', label: 'Gender', options: ['Male', 'Female'], required: true },
        { name: 'weight', type: 'number', label: 'Weight (kg)', required: true },
        { name: 'height', type: 'number', label: 'Height (cm)', required: true },
        { name: 'activity', type: 'select', label: 'Activity Level', options: ['Sedentary', 'Lightly Active', 'Active', 'Very Active'], required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'BMR Calculator',
    slug: 'bmr-calculator',
    category_slug: 'health',
    config: {
      inputs: [
        { name: 'age', type: 'number', label: 'Age', required: true },
        { name: 'gender', type: 'select', label: 'Gender', options: ['Male', 'Female'], required: true },
        { name: 'weight', type: 'number', label: 'Weight (kg)', required: true },
        { name: 'height', type: 'number', label: 'Height (cm)', required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Ideal Weight Calculator',
    slug: 'ideal-weight-calculator',
    category_slug: 'health',
    config: {
      inputs: [
        { name: 'height', type: 'number', label: 'Height (cm)', required: true },
        { name: 'gender', type: 'select', label: 'Gender', options: ['Male', 'Female'], required: true }
      ],
      output: { type: 'metrics_grid' },
      realtime: true
    }
  },
  {
    name: 'Ai Music',
    slug: 'ai-music',
    category_slug: 'ai',
    config: {
      // Custom UI will ignore these config lists, just needed for DB
      inputs: [],
      output: { type: 'custom' },
      realtime: false
    }
  }
];
