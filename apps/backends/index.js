const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { PrismaClient } = require('/Users/soumya/Documents/my-monorepo/apps/backends/generated/prisma');
const prisma = new PrismaClient();

// Middleware first
app.use(express.json()); // for parsing application/json
app.use(cookieParser());

// Connect to the DB first (before using any services)
const connectdb = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/db.js');
connectdb(); // 🔌 MongoDB (or other DB) connection

// Kafka and RabbitMQ consumers/producers after DB
const { connectproducer, sendtransactionevent } = require('./kafka/producer/transactionproducer.js');
const { runconsumer } = require('/Users/soumya/Documents/my-monorepo/apps/backends/kafka/consumer/transactionconsumer.js');
const { connectstatusconsumer } = require('/Users/soumya/Documents/my-monorepo/apps/backends/kafka/consumer/transactionstatusconsumer.js');
const { connecttorabbit } = require('/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice.js');

connectproducer().catch(console.error);
console.log("producer connected")  //  Kafka Producer
runconsumer();   
console.log("first consumer connected")                         //  Kafka Transaction Consumer
connectstatusconsumer();  
console.log("second consumer connected") 

console.log("safe to use ")//  Kafka Transaction Status Consumer
connecttorabbit();                       // RabbitMQ for Notifications

// Route registrations AFTER middleware
const registerroutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/authroutes/authroutes.js');
const loginroutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/loginroute/loginroutes.js');
const sendotproutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/otproute/sendotp.js');
const sendlogoutroutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/logoutroute/logoutroutes.js');
const kafkamockroute = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/kafkamockroute.js');

app.use("/register", registerroutes);    //  Register
app.use("/login", loginroutes);          //  Login
app.use('/sendotp', sendotproutes);      //  OTP
app.use('/logout', sendlogoutroutes);    //  Logout
app.use('/kafkamock', kafkamockroute);   //  Kafka test/mock

// Start server after all connections and middlewares are set
app.listen(3000, () => {
  console.log(' Server is running on port 3000');
});
