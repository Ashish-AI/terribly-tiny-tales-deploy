const express = require("express");
const app = express();

var cors = require('cors');
var request = require('request')

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())


app.listen(3010,(req,res)=>{
    console.log("App running on Port 3010");


    const arr = [1,2,5,8,10];

    request.get("https://terriblytinytales.com/testapi",
        {
            qs:{rollnumber:2}
        }, function(err, tinyRes, body){
            console.log(body)
    });

})
app.use("/sendData", (req, res, next) => {
    let requestMethod = req.method;

    const dataReceived = req.body.number;
})