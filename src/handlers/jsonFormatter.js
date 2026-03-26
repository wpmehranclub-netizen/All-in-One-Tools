module.exports = async (payload) => {
  const { jsonString } = payload;
  if (!jsonString) throw new Error('JSON string is required');

  try {
    const parsed = JSON.parse(jsonString);
    const formatted = JSON.stringify(parsed, null, 2);
    return { formatted };
  } catch (err) {
    throw new Error('Invalid JSON: ' + err.message);
  }
};
