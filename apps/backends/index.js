"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const client_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/generated/prisma"); // Ensure this import path matches your setup
const transactionproducer_1 = require("./kafka/producer/transactionproducer");
const transactionconsumer_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/kafka/consumer/transactionconsumer");
const transactionstatusconsumer_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/kafka/consumer/transactionstatusconsumer");
const notificationservice_1 = require("./services/notifcationservice/notificationservice");
const db_1 = __importDefault(require("./config/db"));
// Initialize the app and Prisma Client
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use(express_1.default.json()); // for parsing application/json
app.use((0, cookie_parser_1.default)());
// Connect to the DB first (before using any services)
(0, db_1.default)(); // 🔌 MongoDB (or other DB) connection
// Kafka and RabbitMQ consumers/producers after DB
(0, transactionproducer_1.connectProducer)()
    .then(() => console.log("Producer connected")) // Kafka Producer
    .catch((err) => console.error('Error connecting Kafka Producer:', err));
console.log("Producer connected"); // Kafka Producer
(0, transactionconsumer_1.runConsumer)(); // First Kafka Consumer
console.log("First consumer connected");
(0, transactionstatusconsumer_1.connectStatusConsumer)(); // Second Kafka Consumer
console.log("Second consumer connected");
console.log("Safe to use"); // Kafka Transaction Status Consumer
(0, notificationservice_1.connectToRabbit)(); // RabbitMQ for Notifications
// Route registrations AFTER middleware
const registerroute_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/routes/authroutes/registerroute"));
const loginroutes_1 = __importDefault(require("./routes/loginroute/loginroutes"));
const sendotp_1 = __importDefault(require("./routes/otproute/sendotp"));
const logoutroutes_1 = __importDefault(require("./routes/logoutroute/logoutroutes"));
const kafkamockroute_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/routes/kafkamockroute"));
const authwithid_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/routes/authroutes/authwithid"));
app.use("/register", registerroute_1.default); // Register
app.use("/login", loginroutes_1.default); // Login
app.use('/sendotp', sendotp_1.default); // OTP
app.use('/logout', logoutroutes_1.default); // Logout
app.use('/kafkamock', kafkamockroute_1.default); // Kafka test/mock
app.use('/auth', authwithid_1.default); // Auth with ID
// Start the server after all connections and middlewares are set
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
