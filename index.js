require("dotenv").config();
const app = require("./src/app");

const APP_PORT = process.env.PORT || 3001;

app.listen(APP_PORT, () => {
  console.log(`App is listening on port ${APP_PORT}`);
});
