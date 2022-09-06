const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./src/config/config.env" });

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
