require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/config/db");

const userRoutes = require("./src/routes/auth.routes");
const adminRoute = require("./src/routes/adminRoute");
const usersRoute = require("./src/routes/usersRoute");
const donorRoute = require("./src/routes/donorRoute");
const refugeeRoute = require("./src/routes/refugeeRoutes");
const notificationRoute = require("./src/routes/notificationRoute");
const missingPersonRoute = require("./src/routes/familyRoute");
const errorHandler = require("./src/middleware/errorHandling");

const app = express();

app.use(express.json());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use("/auth", userRoutes);
app.use("/admin", adminRoute);
app.use("/users", usersRoute);
app.use("/donor", donorRoute);
app.use("/refugee", refugeeRoute);
app.use("/missing-person", missingPersonRoute);
app.use('/ngo', ngoRoute);
app.use("/notifications", notificationRoute);
app.use("/family", missingPersonRoute);

app.get("/",(req,res)=>{
  res.send("API running");
});

app.use(errorHandler);



const server = http.createServer(app);

const io = new Server(server,{
   cors:{
      origin:"http://localhost:5173",
      credentials:true
   }
});

require("./src/socket/socketHandler")(io);



const startServer = async () => {

  try{

      await connectDB();

      const PORT = process.env.PORT || 5000;

      server.listen(PORT,()=>{
          console.log(
             `Server running on port ${PORT}`
          );
      });

  }
  catch(error){
      console.error(
        "Server startup error:",
        error.message
      );

      process.exit(1);
  }

};

startServer();