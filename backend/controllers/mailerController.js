const { MailtrapClient } = require("mailtrap");
const Appointment = require('../models/appointmentModel')
const Recipient = require('../models/recipientModel')

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

// Create recipient
const addtoMailerList = async (req, res) => {
    try {
        let body = req.body
        console.log(body)
        let record = await Recipient.findOne(body)
        if(record) {
            res.status(409).json({error: "Recipient already exists"})
        } else {
            record = await Recipient.create(body)
            if (record) {
                res.status(200).json(record)
            } else {
                res.status(500).json({error: "Database error"})
            }
        }
    } catch (err){
        res.status(500).json({ error: "Unable to process add request" })
    }
}


// Read 
const retrieveMailerList = async (req, res) => {
    try {
        let emailList = await Recipient.find({}, {email: 1, _id:0})
        let list = []
        emailList.forEach(entry => list.push(entry.email))
        console.log(emailList)
        console.log(list)
        res.status(200).json(list)
    } catch {
        res.status(500).json({ error: "Unable to retrieve email list" })
    }
}

// Delete
const removefromMailerList = async (req, res) => {
    try {
        let id = req.params
            recipient = await Recipient.findOneAndDelete({_id: id})
        if (recipient) {
            res.status(200).json(recipient)
        } else {
            res.status(500).json({error: "Database error"})
        }
    } catch {
        res.status(500).json({ error: "Unable to process delete request" })
    }
}

// Send email notification of current appointment requests
const sendAppointmentUpdateEmail = async () => {

    // Retrieving new appointment requests, starting this month
    const this_month = new Date().getMonth() + 1
    const appointments = await Appointment.find({ date: { $gte: this_month }, reviewed: false })

    // Message construction for email notification
    let message = "Good morning!\n\nThere "
    if (appointments.length == 1) message += "is one new appointment request this morning."
    else if (appointments.length > 1) message += `are ${appointments.length} new appointment requests this morning.`
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

// Send email to customer upon appointment approval
const sendApprovalEmail = async (req, res) => {

    try {
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
        client.send({
            from: sender,
            to: recipients,
            subject: "STM Appointment Approval",
            text: message,
            category: "Appointments Notification",
        })

        res.status(200).json({ message: "Email sent successfully" })
    } catch {
        res.status(500).json({ error: 'Email not sent' })

    }

}

module.exports = {
    addtoMailerList,
    retrieveMailerList,
    removefromMailerList,
    sendAppointmentUpdateEmail,
    sendApprovalEmail
}