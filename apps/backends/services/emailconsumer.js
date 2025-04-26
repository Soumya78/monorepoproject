"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const nodemailer_1 = __importDefault(require("nodemailer"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a test account (only for dev/testing)
        const testAccount = yield nodemailer_1.default.createTestAccount();
        // Create a transporter using the test account
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // auto-generated ethereal user
                pass: testAccount.pass, // auto-generated ethereal password
            },
        });
        // Connect to RabbitMQ
        callback_api_1.default.connect('amqp://localhost', (err, connection) => {
            if (err) {
                console.error("❌ RabbitMQ Connection Error:", err);
                return;
            }
            connection.createChannel((err, channel) => {
                if (err) {
                    console.error("❌ Channel Error:", err);
                    return;
                }
                const queue = 'registrationqueue';
                channel.assertQueue(queue, { durable: true });
                console.log(`✅ Waiting for messages in "${queue}"...`);
                channel.consume(queue, (msg) => {
                    if (msg !== null) {
                        const data = JSON.parse(msg.content.toString());
                        const email = data.emailid;
                        console.log(`📨 Sending confirmation email to: ${email}`);
                        const mailOptions = {
                            from: '"Soumya Test App 👨‍💻" <no-reply@test.com>',
                            to: email,
                            subject: '✅ Registration Successful',
                            html: `<h3>Hello!</h3><p>Your registration was successful. 🎉</p>`,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error("❌ Email send error:", error);
                            }
                            else {
                                console.log('✅ Email sent successfully!');
                                console.log(`🔗 Preview it here: ${nodemailer_1.default.getTestMessageUrl(info)}`);
                                channel.ack(msg);
                            }
                        });
                    }
                }, { noAck: false });
            });
        });
    }
    catch (error) {
        console.error('❌ Error:', error);
    }
}))();
