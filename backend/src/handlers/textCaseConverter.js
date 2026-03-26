module.exports = async (payload) => {
  const { text, caseType } = payload;
  if (!text || !caseType) throw new Error('Text and caseType are required');

  let result = text;
  switch (caseType) {
    case 'uppercase':
      result = text.toUpperCase();
      break;
    case 'lowercase':
      result = text.toLowerCase();
      break;
    case 'titlecase':
      result = text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      break;
    default:
      throw new Error('Unsupported case type');
  }

  return { result };
};
