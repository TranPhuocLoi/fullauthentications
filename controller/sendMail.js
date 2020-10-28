const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//send mail
const sendEmail = (to, url) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
      grant_type: "authorization_code",
    },
  });
  console.log({ MAILING_SERVICE_REFRESH_TOKEN });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "Dev Nudo350 Confirmation",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ffcf07; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase; color: #15171C;">Welcome to the Nudo350 FullAuth Project.</h2>
            <p>Congratulations! You're almost set to start using NudoDev App.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: #15171C; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Active your account here</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    console.log("had sent", err, infor);
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;
