const nodemailer = require('nodemailer')
const user = process.env.nodemailer_user
const pass = process.env.nodemailer_pass

module.exports = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })

  const info = await transporter.sendMail({
    from: user,
    to: email,
    subject: subject,
    text: message
  })

  return info
}

