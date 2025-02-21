const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

// Route to handle the "Yes" button click
app.post('/send-email', (req, res) => {
    const recipients = [
        {
            email: 'makosa.ropafadzo06@gmail.com',
            subject: 'Loves You!',
            text: 'Ropah',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
                    <h1 style="color: #e91e63;">💖 I Love You Too! 💖 <br>
                    R</h1>
                   
                    <p style="font-size: 18px;">Here's a little something to brighten your day:</p>
                    <img src="https://cdn.pixabay.com/photo/2015/09/06/20/26/i-beg-your-pardon-927750_960_720.jpg" alt="Love Image" style="width: 100%; max-width: 400px; border-radius: 10px; margin: 20px 0;">
                    <p style="font-size: 18px;">You mean the world to me. 💌</p>
                    <p style="font-size: 18px;">With all my love,</p>
                    <p style="font-size: 18px; font-weight: bold; color: #e91e63;">Your Admirer #Anesu #Shangwa #Shaingwa  #Shengwa #Ropah :) 💕</p>
                </div>
            `
        },
        {
            email: 'anesushangwa01@gmail.com',
            subject: 'You win',
            text: 'siuuuuuu  '
        }
    ];

    recipients.forEach(recipient => {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: recipient.email,
            subject: recipient.subject,
            text: recipient.text,
            html: recipient.html || null // Use HTML if available, otherwise fallback to text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Error sending email to ${recipient.email}:`, error);
            } else {
                console.log(`Email sent to ${recipient.email}:`, info.response);
            }
        });
    });

    res.send('Emails are being sent to the recipients.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});