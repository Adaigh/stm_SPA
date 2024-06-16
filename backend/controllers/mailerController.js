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
            category: "Appointments Notification",
        })
        .then(console.log)
        .catch(console.error)
}

const sendApprovalEmail = async (req,res) => {

    const appointment = req.body

    // Build Approval Email
    let message = "Hello,\n  Your appointment at STM Tuning has been approved! "
    message += "Details are below, and please don't hesitate to call with any questions. "
    message += "We appreciate your patronage and are excited to help with your vehicle.\n\n"
    message += `Date: ${appointment.date}\n`
    message += `Name: ${appointment.firstName} ${appointment.lastName}\n`
    message += `Phone: ${appointment.phoneNumber}\n\n`
    message += `Year: ${appointment.vehicle.vehicleYear}\n`
    message += `Make: ${appointment.vehicle.vehicleMake}\n`
    message += `Model: ${appointment.vehicle.vehicleModel}\n`
    message += `Description: ${appointment.description}\n\n`
    message += `STM Tuning\n`
    message += `4715 E Trent Ave\n`
    message += `Spokane, WA 99212\n`
    message += `(509) 893-2367\n`
    message += `9am-5pm, Monday through Friday\n`
    
    //Send mail
    let response = await client.send({
            from: sender,
            to: recipients,
            subject: "STM Appointment Approval",
            text: message,
            category: "Appointments Notification",
        })
    
    if(!response.success){
        return res.status(500).json({error: 'Email not sent'})
    }
    res.status(200).json({message:"Email sent successfully"})
}

module.exports = {
    sendAppointmentUpdateEmail,
    sendApprovalEmail
}