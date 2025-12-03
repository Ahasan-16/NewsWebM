import nodemailer from 'nodemailer';

export async function sendEmail(EmailTo, EmailText, EmailSubject) {

    const transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASS
        }
    });

    let mailOptions = {
        from: "Next JS News Portal <no-reply@test.com>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transport.sendMail(mailOptions);
}
