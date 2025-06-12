const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECure === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});

const sendAccessCodeEmail = async (recipientEmail, accessCode) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: recipientEmail,
        subject: 'Your Access Code for Employee Task Management Tool',
        text: `Your access code is: ${accessCode}`,
        html: `<p>Your access code is <strong>${accessCode}</strong></p>`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Access code email sent successfully to ${recipientEmail}`);
        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error(`Error sending access code email to ${recipientEmail}:`, error);
        return { success: false, message: error.message };

    }
};

const sendEmployeeSetupEmail = async (employeeEmail, setupLink) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: employeeEmail,
        subject: 'Set Up Your Employee Account for Task Management Tool',
        text: `Welcome to the Employee Task Management Tool! Please use the following link to set up your account: ${setupLink}`,
        html: `<p>Welcome to the Employee Task Management Tool!</p>
               <p>Please click the link below to set up your account:</p>
               <p><a href="${setupLink}">${setupLink}</a></p>
               <p>If you have any questions, please contact your manager.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Employee setup email sent successfully to ${employeeEmail}`);
        return { success: true, message: 'Employee setup email sent successfully.' };
    } catch (error) {
        console.error(`Error sending employee setup email to ${employeeEmail}:`, error);
        throw new Error('Failed to send employee setup email.');
    }
};


module.exports = {
    sendAccessCodeEmail,
    sendEmployeeSetupEmail
};