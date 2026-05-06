require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/auth.routes");
const adminRoute= require("./src/routes/adminRoute.js")
const usersRoute = require("./src/routes/usersRoute.js");
const donorRoute = require("./src/routes/donorRoute.js");
const refugeeRoute = require("./src/routes/refugeeRoutes.js");
const errorHandler = require("./src/middleware/errorHandling.js");
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/auth",userRoutes);
app.use("/admin", adminRoute);
app.use("/users", usersRoute);
app.use("/donor", donorRoute);
app.use("/refugee",refugeeRoute);
app.use(errorHandler);

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
