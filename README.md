# AvenueX-entry-management
An entry management system using MERN Stack
Visitors would be required to fill in their details as well as the host details.
During the check-in time, corresponding host will be notified via mail and SMS.
Upon checkout, visitor would be notified via mail and SMS.
Every entry would be stored in MongoDB



### About AvenueX :-
### Front-End - React

### Back-End - Node.js, Express.js & MongoDB
### SMS service- Twilio
### Mail- Nodemailer


To run it locally -

### Steps to run in development mode:-

1. Fork the repo and clone it.
2. Edit `server/routes/entries.js` and replace `accountSid= 'ACxxxxx'`,`authToken='Your Twilio Auth token Here'`,`twilioNumber='Your twilio number'` with your Twilio account credentials.
 Also replace `emailId='Your email'`,`password='your password'` with the gmail account details the mail would be sent from.
 Additionally you will have to change the account security settings and `allow` less secure apps.
2. Make sure you have `npm` Node.js & MongoDB installed in your system.
3. [Only once] Run (from the root) `cd server && sudo npm install` and `cd .. && cd client && sudo npm install`.
4. Open two terminal windows (one for running Server and other for the UI).
5. Start MongoDB service with `sudo service mongod start`. 
6. Run `cd server && sudo node index.js` to start the server. By default it will run on `port 8000`.
7. For UI run `cd client && sudo npm start` and it will open on a new tab on `port 3000`.
8. Go to `http://localhost:3000` to see the application running.

