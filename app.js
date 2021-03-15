const express = require ('express');
const app = express(); // initialise express
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true})); // for the working of body parser this is required.
const https = require('https'); // used for using apis (as of now ) . internally used . no need to add packages externally . (native)
// GET IS USED WHEN  A USER WANTS TO GET SOMETHING FROM ROOT PATH
app.get('/',function(req,res){

   res.sendFile(__dirname + "/index.html");

}
);
app.post("/",function(req,res){


 const query = req.body.cityname;
 const units ="metric";
 const apiKey = "1132eabe46a9c5ea55f530b7ca106fde";
 const url = "https://api.openweathermap.org/data/2.5/weather?units="+ units+ "&q=" + query +"&appid=" + apiKey;

 https.get(url,function(response){
   console.log(response.statusCode);
    // getting data from apis
   response.on("data",function(Data){
     const weatherData = JSON.parse(Data);
     const temp = weatherData.main.temp;
         const des = weatherData.weather[0].description;
         const icon  = weatherData.weather[0].icon;
         const iconurl =  'http://openweathermap.org/img/wn/' + icon + '@2x.png';
     res.write('<h1>The weather description is '+ des + '.</h1>');
    res.write("<h1>The Temperature in" +query+ " is "+ temp + ' celsius</h1>');
    res.write("<img src='" + iconurl + "'/>");
    res.send();
   })
 });

});


app.listen(3000,function(){
  console.log('App is running on port 3000');
});
