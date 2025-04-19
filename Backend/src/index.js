const express = require("express");
const app = express();
require("dotenv").config();
const{MONOGO_CONNECT} = require("./lib/DB");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const adminRoute = require("./routes/admin.routes");
const sellerRoute = require("./routes/seller.routes");
const buyerRoute = require("./routes/buyer.routes");
const paymentRouter = require("./routes/payment.routes");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*" ,
    credentials:true,
}))


app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",adminRoute);
app.use("/",sellerRoute);
app.use("/",buyerRoute);
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
  
app.use("/",paymentRouter);


MONOGO_CONNECT().then(()=>{
    console.log("DB Connected Sucessfully!!");
    app.listen(process.env.PORT,()=>{
        console.log("Server Connected!!");
    })
    
}).catch(()=>{
    console.log("Error While Connecting With DB!!")
})