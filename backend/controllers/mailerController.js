const { MailtrapClient } = require("mailtrap");
const Appointment = require('../models/appointmentModel')

const client = new MailtrapClient(
    { endpoint: process.env.MAILER_ENDPOINT, token: process.env.MAILER_TOKEN }
);

const sender = {
    email: "no-reply@demomailtrap.com",
    name: "STM Tuning",
};

const recipients = [
    {
        email: "daigh.alex@gmail.com",
    }
];

const sendAppointmentUpdateEmail = async () => {

    // Retrieving new appointment requests, starting this month
    const this_month = new Date().getMonth()+1
    const appointments = await Appointment.find({date: {$gte: this_month}, reviewed: false})

    // Message construction for email notification
    let message = "Good morning!\n\nThere "
    if(appointments.length == 1) message += "is one new appointment request this morning."
    else if(appointments.length > 1) message += `are ${appointments.length} new appointment requests this morning.`
    else message += "are no new appointment requests this morning."

    //Send mail
    client
        .send({
            from: sender,
            to: recipients,
            subject: "STM Appointment Request Update",
            text: message,
            category: "Integration Test",
        })
        .then(console.log)
        .catch(console.error)
}

const sendApprovalEmail = async (appointment) => {

} 

module.exports = {sendAppointmentUpdateEmail}