const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app =express()

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
     const firsName = req.body.fName;
     const lastName = req.body.lName;
     const email = req.body.email;
     const data = {
       members:[
         {
           email_address: email,
           status: "subscribed",
           merge_fields:{
             FNAME: firsName,
             LNAME: lastName
           }
         }
       ]
     };

     const jsonData = JSON.stringify(data);
     const url = "https://us21.api.mailchimp.com/3.0/lists/e6d81212b6";
     const options = {
       method:"POST",
       auth: "spandana7:030d2f8b8de12d81d9629f302ba9a3af-us21"
     }
     const request= https.request(url,options,function(response){
       if(response.statusCode === 200)
       {
         res.sendFile(__dirname + "/success.html");
       }
       else
       {
          res.sendFile(__dirname + "/failure.html");
       }

       response.on("data",function(data){
         console.log(JSON.parse(data));
       })
     })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000");
});



//030d2f8b8de12d81d9629f302ba9a3af-us21(api key)
//e6d81212b6.(list id)
