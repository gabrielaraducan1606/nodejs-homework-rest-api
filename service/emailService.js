const nodemailer = require("nodemailer");

// Configurare pentru Gmail; reține că, pentru Gmail, este posibil să fie nevoie de o parolă de aplicație.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:${process.env.PORT || 3000}/api/users/verify/${verificationToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking on the following link:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};
