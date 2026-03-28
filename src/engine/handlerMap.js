const wordCounter = require('../handlers/wordCounter');
const textCaseConverter = require('../handlers/textCaseConverter');
const imageResizer = require('../handlers/imageResizer');
const bmiCalculator = require('../handlers/bmiCalculator');
const jsonFormatter = require('../handlers/jsonFormatter');
const basicCalculator = require('../handlers/basicCalculator');
const scientificCalculator = require('../handlers/scientificCalculator');
const ageCalculator = require('../handlers/ageCalculator');
const percentageCalculator = require('../handlers/percentageCalculator');
const discountCalculator = require('../handlers/discountCalculator');
const currencyConverter = require('../handlers/currencyConverter');
const bmrCalculator = require('../handlers/bmrCalculator');
const timeZoneConverter = require('../handlers/timeZoneConverter');
const ovulationCalculator = require('../handlers/ovulationCalculator');

const handlerMap = {
  'word-counter': wordCounter,
  'text-case-converter': textCaseConverter,
  'image-resizer': imageResizer,
  'bmi-calculator': bmiCalculator,
  'json-formatter': jsonFormatter,
  'basic-calculator': basicCalculator,
  'scientific-calculator': scientificCalculator,
  'age-calculator': ageCalculator,
  'percentage-calculator': percentageCalculator,
  'discount-calculator': discountCalculator,
  'currency-converter': currencyConverter,
  'bmr-calculator': bmrCalculator,
  'time-zone-converter': timeZoneConverter,
  'ovulation-calculator': ovulationCalculator
};

module.exports = handlerMap;
