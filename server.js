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
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD 
    }
});

// Route to handle the "Yes" button click
app.post('/send-email', (req, res) => {
    const mailOptions = {
        from: 'Kingshangwa01@gmail.com',
        to: 'anesushangwa01@gmail.com', // Email to receive the message
        subject: 'She Loves You!',
        text: 'She said YES! She loves you! Ropah'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});