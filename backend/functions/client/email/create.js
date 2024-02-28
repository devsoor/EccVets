import handler from '../../util/handler';
import { sendEmail } from '../../util/sesEmails';
// import { fDateTimeString } from '../../util/formatTime';
import { dbGetOrder, dbGetEvent } from '../../libs/queries-lib';
import { utcToZonedTime, format } from 'date-fns-tz'

const sendEmailShirt = async (emailAddress, order) => {
    const subject = 'Red Shirts order received';
    let content = `<p>Thank you for your order of Red Shirt(s) to show your support of our military. Your order should be ready in 4-6 weeks. You will receive an email letting you know when your shirt can be picked up. </p>`
    order.map((item, index) => {
        content = content+`<h3>Shirt ${index+1}</h3>`;
        content = content+`<p>Size: ${item.size}</p>`;
        content = content+`<p>Gender: ${item.gender}</p>`;
        content = content+`<p>Amount: $${item.price}</p>`;
        content = content+`<p>Branch of service: ${item.type}</p>`;
    })
    await sendEmail(emailAddress, subject, content);
}

const sendEmailSign = async (emailAddress, order) => {
    const subject = 'Veteran Sign order received';
    const content = `<p>Thank you for your donation of $${order.price} </p>
    <p>Your community support sign will read:</p>
    <p style="font-size: 14px;color: #757575">"${order.appearName}"</p>
    <p>In recognition of your annual donation, we will create and store your Veterans Community Support Sign. Your sign will be displayed at the Charity Golf Tournament and on Memorial Day, 4th of July & Veterans Day. If you would like your sign displayed the following year just donate $100/year due April 1st of each year. You will receive an email as a reminder. </p>
    `
    await sendEmail(emailAddress, subject, content);
}

const sendEmailDonation = async (emailAddress, order) => {
    const subject = 'Your Donation received';
    const content = `<p>Thank you for your donation of $${order.amount} </p>
    `
    await sendEmail(emailAddress, subject, content);
}
const sendEmailEvent = async (emailAddress, eventDetail) => {
    // start date
    const timeZone = 'America/Phoenix';
    const start = new Date(eventDetail.startDate)
    // console.log("start = ", start)
    const zonedStartDate = utcToZonedTime(start, timeZone);
    // console.log("zonedStartDate = ", zonedStartDate)
    const startDate = format(new Date(zonedStartDate), 'MMM dd, yyyy p');
    // console.log("output = ", startDate)

    // end date
    const end = new Date(eventDetail.endDate)
    // console.log("end = ", end)
    const zonedEndDate = utcToZonedTime(end, timeZone);
    // console.log("zonedEndDate = ", zonedEndDate)
    const endDate = format(new Date(zonedEndDate), 'MMM dd, yyyy p');
    // console.log("output = ", startDate)

    const subject = 'Event Registration Confirmation';
    const content = `<p>Thank you for registering for <b>${eventDetail.title}</b> event from ${startDate} to ${endDate}</p>
    `
    await sendEmail(emailAddress, subject, content);
}

export const main = handler(async (event) => {
    console.log(event);
    
    const {emailAddress, orderID, type} = JSON.parse(event.body);
    let order, eventDetail;

    const orderType = orderID.split(":")[0];
    const orderNumber = orderID.split(":")[1];

    if (orderType=== 'ORDER') {
        order = await dbGetOrder(orderNumber);
    } else if (orderType === 'EVENT') {
        eventDetail = await dbGetEvent(orderNumber)
    }

    switch (type) {
        case "Red Shirt":
            await sendEmailShirt(emailAddress, order);
            break;
        case "Veteran Sign":
            await sendEmailSign(emailAddress, order[0]);
            break;
        case "Donation":
            await sendEmailDonation(emailAddress, order[0]);
            break;    
        default:
            // its the events
            await sendEmailEvent(emailAddress, eventDetail);
            break;
    }
});

export const contactForm = handler(async (event) => {
    console.log(event);
    const params = JSON.parse(event.body);

    const subject = 'New Contact Lead';
    const content = `<h6>The following message was received from:</h6>
    <p>Name: ${params.fullName}</p>
    <p>Email: ${params.email}</p>
    <p>Phone: ${params.phoneNumber}</p>
    <p>Message: ${params.message}</p>
    `
    const emailAddress = process.env.ADMIN_EMAIL;
    await sendEmail(emailAddress, subject, content, false);
});

