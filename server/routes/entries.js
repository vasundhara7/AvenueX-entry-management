var bodyParser = require('body-parser');
const router = require('express').Router();
const Entry = require('../models/entrylogs');
const nodemailer = require('nodemailer');
//enter your accountsid and auth token from twilio account
const accountSid= 'ACxxxxx';
const authToken='Your Twilio Auth token Here';

const client= require('twilio')(accountSid,authToken);
//enter the email id and password to send mail from
const emailId='Your email';
const password='your password';
const twilioNumber='Your twilio number';


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: { 
        user: emailId,
        pass: password
    }
  });


function getTime(){
    var now = new Date();
    var currentOffset = now.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var ISTTime = new Date(now.getTime() + (ISTOffset + currentOffset)*60000);


var hours = ISTTime.getHours();

if(hours>12) {
    hours = hours-12;
    x = "pm"
}
else x="am";

var minutes = ISTTime.getMinutes();
var time = hours + ":" + minutes + " "+ x;
    return time;
}



router.get('/', (req, res, next) => {
    console.log("entered main page");
    res.json("entry form here");

});

router.post('/', async (req, res, next) => {
    try{
            console.log("posting entry");
            console.log(req.body);
            const {name, email, phone, hostname, hostemail, hostphone} = req.body;

            var entrylog= new Entry({
                name : name,
                email: email,
                phone: phone,
                hostname : hostname,
                hostemail: hostemail,
                hostphone: hostphone,
                checkin: getTime()
            });

            await entrylog.save();


            //---------send mail to host---------------------
        const html = `Hi, host ${hostname},
        You have an appointment from a vistor:
        details are:
        Name : ${name}
        Email: ${email} 
        Phone: ${phone}
        Checkin time : ${entrylog.checkin}
        Have a pleasant day!`;

        const mailOptions = {
            from: emailId,
            to: hostemail,
            subject: 'Check-in Notification',
            text: html
        };

        await transporter.sendMail(mailOptions, function(error, info){
            if(error) {
            console.log(error);
            } else {
            console.log('Email sent' + info.response);
            }
            
        });

        var host_contact=hostphone;
        host_contact='+91' + host_contact;

        client.messages.create({
            to:host_contact,
            from:twilioNumber,
            body:html
        }).then((message)=>(console.log(message.sid)));


        //-----------------------------------

            
        res.json({entry: entrylog.id});
}
catch(error){
    next(error);
  }
});

router.post('/checkout', async (req, res, next) => {
    try{
            console.log("checking out");
            console.log(req.body);
            id = req.body.id;

            await Entry.findById(id).then(async function(entrylog){
                var now1 = new Date();
                console.log(now1);
                entrylog.checkout = getTime();
                entrylog.save();

                 //---------send mail to visitor---------------------
        const html = `Hi, visitor ${entrylog.name},
        Phone : ${entrylog.phone}
        Email : ${entrylog.email}
        You have checked out:
        Checkin time : ${entrylog.checkin}
        Checkout time : ${entrylog.checkout}
        Host : ${entrylog.hostname}
        Address visited: http://localhost:3000/dashboard
        Have a pleasant day!`;

        const mailOptions = {
            from: emailId,
            to: entrylog.email,
            subject: 'Checkout Notification',
            text: html
        };

        await transporter.sendMail(mailOptions, function(error, info){
            if(error) {
            console.log(error);
            } else {
            console.log('Email sent' + info.response);
            }
            
        });

        //-----------------------------------
            });
            

           

            res.json("checked out");
}
catch(error){
    next(error);
  }
});



module.exports = router;
