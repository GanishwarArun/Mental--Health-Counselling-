const sendEmail = (to, subject, message) => {
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    return { success: true, message: "Email sent successfully!" };
};

module.exports = sendEmail;
