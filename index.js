const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/home",require("./routes/route"));
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on ::::: ${PORT}`);
});
