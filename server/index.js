require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("Refugee Aid Platform API is running...");
});

startServer();
