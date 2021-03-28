const express = require("express");
const app = express();

var cors = require('cors');
// var request = require('request')
var https = require("https")

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.listen(3010,(req,responseMain)=>{

    console.log("App running on Port 3010");

})
app.use("/sendData", (mainReq, mainRes, next) => {

    const dataReceived = mainReq.body;
    // console.log("===============\n"+JSON.stringify(dataReceived));

    // const arr = [1,2,5,8,10,222];
    const arr = dataReceived["data"];

    var urls = arr.map((item) => `https://terriblytinytales.com/testapi?rollnumber=${item}`);
    var completedRequests = 0;

    var body = [];

    urls.forEach( (url,index) => {
        var responses = [];
        
        https.get(url, res => {
            res.on('data', chunk => {
                responses.push(chunk);
                body.push({item:arr[index],value:""+chunk});
            });
            res.on('end', () => {
                if(completedRequests++ === urls.length -1 ){
                    //Main response  goes from here
                    // console.log('body',JSON.stringify(body));
                    mainRes.send(JSON.stringify(body))
                }
            })
        })
    })
    // console.log("Next block of code")
})