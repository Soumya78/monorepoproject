
const express = require('express');

const registerroutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/authroutes.js');
const loginroutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/loginroutes.js');
const app = express();

const connectdb = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/db.js');
const {connecttorabbit} = require('/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice.js');


app.use(express.json()); // for parsing application/json
connectdb();//for connecting to the database
connecttorabbit();


app.use("/register", registerroutes) //for registering the user

app.use("/login", loginroutes) //for logging in the user





app.listen(3000, () => { console.log('Server is running on port 3000') });