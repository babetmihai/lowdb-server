const nodemailer = require('nodemailer')
const { nodemailerUser, nodemailerPass } = process.env

module.exports = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: nodemailerUser,
      pass: nodemailerPass
    }
  })

  const info = await transporter.sendMail({
    from: nodemailerUser,
    to: email,
    subject: subject,
    text: message
  })

  return info
}

