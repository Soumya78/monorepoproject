import amqp, { Connection, Channel, Message } from 'amqplib/callback_api';
import nodemailer from 'nodemailer';

(async () => {
  try {
    // Create a test account (only for dev/testing)
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // auto-generated ethereal user
        pass: testAccount.pass, // auto-generated ethereal password
      },
    });

    // Connect to RabbitMQ
    amqp.connect('amqp://localhost', (err: any, connection: Connection) => {
      if (err) {
        console.error("❌ RabbitMQ Connection Error:", err);
        return;
      }

      connection.createChannel((err: any, channel: Channel) => {
        if (err) {
          console.error("❌ Channel Error:", err);
          return;
        }

        const queue = 'registrationqueue';

        channel.assertQueue(queue, { durable: true });

        console.log(`✅ Waiting for messages in "${queue}"...`);

        channel.consume(queue, (msg: Message | null) => {
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
              } else {
                console.log('✅ Email sent successfully!');
                console.log(`🔗 Preview it here: ${nodemailer.getTestMessageUrl(info)}`);
                channel.ack(msg);
              }
            });
          }
        }, { noAck: false });
      });
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
