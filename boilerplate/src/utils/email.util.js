import nodeMailer from 'nodemailer';

import { appConfig } from '@config/app.config';

const transporter = nodeMailer.createTransport({
  host: appConfig.SMTP_HOST, // 'smtp.zoho.com',
  secure: true,
  port: appConfig.SMTP_PORT, // 465,
  auth: {
    user: appConfig.SMTP_USERNAME,
    pass: appConfig.SMTP_PASSWORD,
  },
});

/**
 * @author sivabharathy
 * 
 * @param {*} toEmail 
 * @param {*} subject 
 * @param {*} htmlMessage 
 * @returns 
 */
export const sendEmail = (toEmail, subject, htmlMessage) => {
  return new Promise((resolve, reject) => {
    try {
      if (toEmail == null || subject == null || htmlMessage == null) {
        reject('Error')
      } else {
        const mailOptions = {
          from: env.SMTP_EMAIL_FROM, // 'siva@sparkouttech.com', // sender address
          to: toEmail, // 'gotocva@gmail.com',
          subject: subject, // 'Some subject', // Subject line
          html: welcomeEmail, // '<p>test</p>', // plain text body
        };
        return transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
      }
    } catch (error) {
      console.log(`sending mail has been failed Because, ${error.message}`);
      reject(error);
    }
  })
}