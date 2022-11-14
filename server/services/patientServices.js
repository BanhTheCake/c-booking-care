const db = require("../models");
const emailServices = require('./emailServices') 
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const buildUrlActivate = (doctorId) => {
    const token = uuidv4()
    const url = `${process.env.URL_REACT_APP}/verifyBooking?doctorId=${doctorId}&token=${token}`
    return [url, token]
}

const handleGetBookAppointment = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [user, isCreated] = await db.Users.findOrCreate({
                where: { email: data?.email },
                defaults: {
                    email: data?.email,
                    roleId: 'R3'
                }
            });

            const [url, token] = buildUrlActivate(data?.doctorId)

            const [currentPatient, isCreatedPatient] = await db.Bookings.findOrCreate({
                where: { doctorId: data?.doctorId, patientId: user?.id },
                defaults: {
                    statusId: 'S1',
                    doctorId: data?.doctorId,
                    patientId: user?.id,
                    date: data.date,
                    timeType: data.timeType,
                    token: token
                },
            })

            emailServices.sendEmail({
                receiveEmail: data?.email,
                fullName: data?.name,
                time: data?.time,
                price: data?.price,
                address: data?.address,
                url: url
            })

            if (!isCreatedPatient) {
                await currentPatient.update({
                    date: data.date,
                    timeType: data.timeType,
                    statusId: 'S1',
                    token: token
                })
            }


            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentPatient
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { handleGetBookAppointment }