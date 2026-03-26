const wordCounter = require('../handlers/wordCounter');
const textCaseConverter = require('../handlers/textCaseConverter');
const imageResizer = require('../handlers/imageResizer');
const bmiCalculator = require('../handlers/bmiCalculator');
const jsonFormatter = require('../handlers/jsonFormatter');

const handlerMap = {
  'word-counter': wordCounter,
  'text-case-converter': textCaseConverter,
  'image-resizer': imageResizer,
  'bmi-calculator': bmiCalculator,
  'json-formatter': jsonFormatter
};

module.exports = handlerMap;
