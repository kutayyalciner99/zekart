const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const PORT = 3000;

// Güvenlik başlıkları
app.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: "Çok fazla istek attınız, lütfen daha sonra tekrar deneyin." }
});
app.use(limiter);

// Basit bot kontrolü
app.use((req, res, next) => {
  const ua = req.headers['user-agent'] || '';
  if (/bot|crawl|spider|wget|curl|python|scrapy/i.test(ua)) {
    return res.status(403).send('Bot erişimi engellendi.');
  }
  next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'atlas.markahost.com',
    port: 587, // TLS portu
    secure: false, // 587 için false
    auth: {
      user: 'budak@zek.art',
      pass: 'p5dwy31cjgqs'
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'budak@zek.art',
      subject: subject,
      text: message,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Subject:</b> ${subject}</p>
             <p><b>Message:</b><br>${message}</p>`
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});