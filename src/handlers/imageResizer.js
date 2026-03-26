const sharp = require('sharp');

module.exports = async (payload) => {
  const { imageBase64, width, height } = payload;
  if (!imageBase64 || !width || !height) {
    throw new Error('Image, width, and height are required');
  }

  // Expect base64 data URL e.g. "data:image/png;base64,iVBORw0KGgo..."
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const resizedBuffer = await sharp(buffer)
    .resize(parseInt(width), parseInt(height), {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toBuffer();

  const mime = imageBase64.match(/^data:(image\/\w+);base64,/)[1];
  const outputBase64 = `data:${mime};base64,${resizedBuffer.toString('base64')}`;

  return { imageBase64: outputBase64 };
};
