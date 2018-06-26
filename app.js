var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/georadar", function(req, res){
    res.render("gpradars/index");
});

app.get("/georadar/news", function(req, res){
    res.render("gpradars/news");
});

app.get("/georadar/offer", function(req, res){
    res.render("gpradars/offer");
});

app.get("/georadar/eq", function(req, res){
    res.render("gpradars/eq");
});

app.get("/georadar/about", function(req, res){
    res.render("gpradars/about");
});

app.get("/georadar/contact", function(req, res){
    res.render("gpradars/contact");
});

app.post("/georadar", function(req, res) {
    var subject = req.body["name"];
    var mail = req.body["email"];
    var desc = req.body["message"];
  
    if (!subject || !mail) {
      res.send("Error: Email & Subject should not be Blank");
      return false;
    }
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        // host: "logik.home.pl", 
        // secureConnection: false, 
        // port: 25, 
            auth: {
                // user: 'info+gpradars_com.logik',
                // pass: 'qwe123qwe'
                user: 'mbologik@gmail.com',
                pass: 'P1werk0Mbologik'
            }
    });
    
    var mailOptions = {
        from: mail,
        to: "info@gpradars.com", 
        subject: subject,
        html: "Wiadomosc z portalu www.gpradars.com"+"<br><b>"+desc+"</b>" +"<br>" + "odpowiedz prosze kierowac na " + mail
    };
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            res.send("Email could not be sent due to error:" +error);
        }else {
            res.redirect("/georadar");
        }
    });
});

app.listen(8080, "localhost", function(){
    console.log("server has started");
});