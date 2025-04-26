import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '/Users/soumya/Documents/my-monorepo/apps/backends/generated/prisma/client.js';// Ensure this import path matches your setup
import{ connectProducer, sendTransactionEvent } from './kafka/producer/transactionproducer.ts';
import { runConsumer } from './kafka/consumer/transactionconsumer.ts';
import { connectStatusConsumer } from './kafka/consumer/transactionstatusconsumer.ts';
import { connectToRabbit } from './services/notifcationservice/notificationservice.ts';
import connectDB from './config/db.ts';

// Initialize the app and Prisma Client
const app = express();
const prisma = new PrismaClient();
-
// Middleware
app.use(express.json()); // for parsing application/json
app.use(cookieParser());

// Connect to the DB first (before using any services)
connectDB(); // 🔌 MongoDB (or other DB) connection

// Kafka and RabbitMQ consumers/producers after DB
connectProducer()
  .then(() => console.log("Producer connected")) // Kafka Producer
  .catch((err) => console.error('Error connecting Kafka Producer:', err));

console.log("Producer connected"); // Kafka Producer
runConsumer (); // First Kafka Consumer
console.log("First consumer connected");

connectStatusConsumer(); // Second Kafka Consumer
console.log("Second consumer connected");

console.log("Safe to use"); // Kafka Transaction Status Consumer
connectToRabbit(); // RabbitMQ for Notifications

// Route registrations AFTER middleware
import registerroutes from './routes/authroutes/registerroute.ts';
import loginroutes from './routes/loginroute/loginroutes.ts';
import sendotproutes from './routes/otproute/sendotp.ts';
import sendlogoutroutes from './routes/logoutroute/logoutroutes.ts';
import kafkamockroute from './routes/kafkamockroute.ts';
import authwithid from './routes/authroutes/authwithid.ts';

app.use("/register", registerroutes); // Register
app.use("/login", loginroutes); // Login
app.use('/sendotp', sendotproutes); // OTP
app.use('/logout', sendlogoutroutes); // Logout
app.use('/kafkamock', kafkamockroute); // Kafka test/mock
app.use('/auth', authwithid); // Auth with ID

// Start the server after all connections and middlewares are set
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
