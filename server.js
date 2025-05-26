const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve HTML and other static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohitboy112@gmail.com",
      pass: "qomr xyun zitx nhkz"
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "mohitboy112@gmail.com",
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <img src="cid:logo" alt="Logo" style="max-width: 150px; margin-bottom: 20px;"><br>
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      </div>
    `,
    attachments: [{
      filename: 'LOGO.jpg',
      path: './LOGO.jpg', // or absolute path
      cid: 'logo' // same as in the img src above
    }]
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.json({ success: false });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
