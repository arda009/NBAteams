const express = require("express");
const app = express();
require("dotenv").config();
require("./api/data/db");
router = require("./api/routes")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", router);

app.listen(process.env.PORT_NUMBER, function(){
    console.log("App started on port: ", process.env.PORT_NUMBER)
})