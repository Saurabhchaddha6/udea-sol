import nodemailer, { SendMailOptions, Transporter } from "nodemailer"

let transporter : Transporter;


const setupMailer = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER_NAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        // Use secure TLS configuration
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      },
      requireTLS: true,
      logger: true,
      debug: true,
      connectionTimeout: 30000,
    });
  }
};

export const sendMail = async (mailBody: SendMailOptions): Promise<void> => {
  try {
    setupMailer();

    const defaultMailOptions: SendMailOptions = {
      from: process.env.MAIL_USER_NAME,
    };

    const finalMailOptions = {
      ...defaultMailOptions,
      ...mailBody,
    };

    // Verify connection before sending
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    const result = await transporter.sendMail(finalMailOptions);
    console.log("Email sent successfully:", result.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};