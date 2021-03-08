const nodemailer = require("nodemailer");

exports.sendEmail = async (to,subject, body) => {

  const { MAILER_HOST, MAILER_ACCOUNT,MAILER_PASSWORD } = process.env;
  let transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: 587,
    secure: false,
    auth: {
      user: MAILER_ACCOUNT,
      pass: MAILER_PASSWORD,
    },
  });

    let info = await transporter.sendMail({
    from: `Mail Support <${MAILER_ACCOUNT}>`,
    to: to,
    subject: subject,
    html: body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
