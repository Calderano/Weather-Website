
 const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const query=req.body.CityName;
  const apiKey="cb64f19b9dc90faa10f69a7c1d5d7637";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey +"&units=" +unit;

    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description
        const feelsliketemp=weatherData.main.feels_like
        const icon=weatherData.weather[0].icon;
        const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in " + query + " is: "+temp+" degrees Celcius.</h1>");
        res.write("<h2>The temperature feels like"+" "+feelsliketemp+" "+"degrees Celcius.</h2>");
        res.write("<h2>The weather is currently"+" "+description+".</h2>");
        res.write("<img src=" +imageURL +">");
        res.send();
      });
    });
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
