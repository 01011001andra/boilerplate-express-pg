import nodemailer from 'nodemailer'

const userGmail = process.env.USER_GMAIL
const userAppPassword = process.env.APP_PASSWORD_GMAIL

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: userGmail,
    pass: userAppPassword
  }
})

const sendEmail = async (jwt: string) => {
  // send mail with defined transport object
  const mailOptions = {
    from: `"Code Mahir" <${userGmail}>`,
    to: 'yandrayt1@gmail.com',
    subject: 'Aktifkan Email Anda di Code Mahir',
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aktivasi Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        padding: 20px;
        max-width: 600px;
        margin: 30px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      h1 {
        color: #1a73e8;
      }
      p {
        color: #333;
        font-size: 16px;
        line-height: 1.5;
      }
      a.activate-btn {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #1a73e8;
        text-decoration: none;
        border-radius: 6px;
      }
      a.activate-btn:hover {
        background-color: #0056b3;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h1>Aktifkan Email Anda</h1>
      <p>Halo Yandra,</p>
      <p>
        Terima kasih telah mendaftar di <strong>codemahir.tech</strong>. Silakan
        klik tombol di bawah ini untuk mengaktifkan akun Anda:
      </p>
      <a
        href="http://e-course-tk.vercel.app/activate/${jwt}"
        class="activate-btn"
        >Aktifkan Sekarang</a
      >
      <p>Jika Anda tidak mendaftar di codemahir.tech, abaikan email ini.</p>
      <div class="footer">
        &copy; 2024 Code Mahir. All Rights Reserved.
      </div>
    </div>
  </body>
</html>
`
  }

  await transporter.sendMail(mailOptions)
}

export default sendEmail
