import express from "express"
import http from "http"
import mongoose from "mongoose"
import path from "path"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import User from "./schema/userModel"
import routes from "./routes/route"

require('dotenv').config()

const app = express();

let server
server = http.createServer(app)

//#region MongoDB connect
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

mongoose.set("debug", true);
//#endregion

//#region set cross origin
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
//#endregion

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

//#region token expiration checking
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) { 
    return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
   } 
   res.locals.loggedInUser = await User.findById(userId); next(); 
  } else { 
   next(); 
  } 
 });
 //#endregion

//#region load router
app.use('/api', routes)
//#endregion

//====Port open to run application
server.listen(process.env.PORT, (err) => {
    if(err)
        throw err

    console.log(`Server is running on ${process.env.PORT}`);
});
