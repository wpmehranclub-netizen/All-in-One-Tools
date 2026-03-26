module.exports = async (payload) => {
  const { text } = payload;
  if (!text) throw new Error('Text is required');

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = text.split(/[.?!]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n+/).filter(Boolean).length;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs
  };
};
