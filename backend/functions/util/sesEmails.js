import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
const sesClient = new SESClient();
import * as dotenv from 'dotenv';
dotenv.config()
const createSendEmailCommand = (toAddress, subject, htmlBody) => {
  console.log("createSendEmailCommand: toAddress = ", toAddress)
  console.log("createSendEmailCommand: subject = ", subject)
  console.log("createSendEmailCommand: htmlBody = ", htmlBody)
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [
        toAddress
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: `Veterans Club at Encanterra <${process.env.INFO_EMAIL}>`,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

export const sendEmail = async (toAddress, subject, content, footer=true) => {
  let htmlBody = "";
  const footerInfo =  `<hr color=#F7F3F4>
  <p>Thank you for supporting the Veterans Club at Encanterra. For questions, please contact orders@eccvets.org</p>
  `
  if (footer) {
    htmlBody = content.concat(footerInfo);
  } else {
    htmlBody = content;
  }
  const sendEmailCommand = createSendEmailCommand(toAddress, subject, htmlBody);

  try {
    const sesResponse = await sesClient.send(sendEmailCommand);
    console.log("sesResponse: ", sesResponse)
    console.log(`Sent email to ${toAddress}`)
  } catch (e) {
    console.error("Failed to send email. ", e);
    return e;
  }
};

/* ---------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------- */

