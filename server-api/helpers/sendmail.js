
import * as config from "../config/config.js"

const sendMail = (recieverEmail, subject, body) => {
  return {
    Source: config.SES_SENDER_EMAIL || '"Nextify.com Admin" <khubaib2005azam@gmail.com>',
    Destination: { ToAddresses: [recieverEmail] },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: `
        
        Nextify.com = ${subject}
        
        `
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
              <html>
                  <body>
                      <h1> Nextify.com </h1>
                      ${body}
                  </body>
              </html>

          `
        }
      }
    }
  }
}

export default sendMail;