var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var nodemailer = require("nodemailer");
var i18n = require("i18n-express");
var session = require("express-session")

// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
    siteLangs: ["en","pl"],
    textsVarName: 'translation'
  }));

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