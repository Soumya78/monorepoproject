const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

(async () => {
  // Create a test account (only for dev/testing)
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter using the test account
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // auto-generated ethereal user
      pass: testAccount.pass, // auto-generated ethereal password
    },
  });

  // Connect to RabbitMQ
  amqp.connect('amqp://localhost', function (err, connection) {
    if (err) {
      console.error("❌ RabbitMQ Connection Error:", err);
      return;
    }

    connection.createChannel(function (err, channel) {
      if (err) {
        console.error("❌ Channel Error:", err);
        return;
      }

      const queue = 'registrationqueue';

      channel.assertQueue(queue, { durable: true });

      console.log(`✅ Waiting for messages in "${queue}"...`);

      channel.consume(queue, function (msg) {
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
})();
