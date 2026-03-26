require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on ${address}`);
});
