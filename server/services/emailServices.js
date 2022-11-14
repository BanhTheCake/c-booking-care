require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../models');

const sendEmail = async (data) => {
    const { receiveEmail, fullName, time, price, address, url } = data;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODE_GMAIL_APP,
            pass: process.env.NODE_GMAIL_PASS,
        },
    });

    let mailOptions = {
        from: '"BanhTheCake 👻" <banhtheCake@gmail.com>',
        to: receiveEmail,
        subject: 'Thông tin đặt lịch khám bệnh',
        html: `
            <h2>Gửi ${fullName}</h2>
            <p>Cảm ơn bạn đã đặt lịch khám bệnh bên BanhTheHospital, xin vui lòng xác nhận lại lịch khám như sau</p>
            <p>Giờ Khám: ${time}</p>
            <p>Giá Khám: ${price}</p>
            <p>Địa chỉ: ${address}</p>
            <p>Nếu tất cả thông tin trên là đúng thì vui lòng ấn vào link để xác nhận !</p>
            <div><a href=${url} target="_blank">Click here !</a></div>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
};

const confirmEmail = (data) => {
    const { receiveEmail, fullName, imageFile } = data;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODE_GMAIL_APP,
            pass: process.env.NODE_GMAIL_PASS,
        },
    });

    let mailOptions = {
        from: '"BanhTheCake 👻" <banhtheCake@gmail.com>',
        to: receiveEmail,
        subject: 'Khám bệnh thành công - Hoá đơn - Đơn thuốc',
        html: `
            <h2>Gửi ${fullName}</h2>
            <p>Cảm ơn bạn đã đặt khám bệnh bên BanhTheHospital, bạn có thể coi ảnh đơn thuốc dưới đây</p>
            <p>Cảm ơn bạn đã dành thời gian đọc tin nhắn này</p>
        `,
        attachments: [
            {
                // encoded string as an attachment
                filename: 'text.jpg',
                content: imageFile.split('base64,')[1],
                encoding: 'base64',
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
};

const handleVerifyBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentPatient = await db.Bookings.findOne({
                where: {
                    doctorId: data?.doctorId,
                    token: data?.token,
                    statusId: 'S1',
                },
            });
            if (!currentPatient) {
                return resolve({
                    errCode: 1,
                    message: 'Booking already activated or not exist !',
                });
            }
            currentPatient.statusId = 'S2';
            await currentPatient.save();
            resolve({
                errCode: 0,
                message: 'Activated Successfully !',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleConfirmBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentPatient = await db.Bookings.findOne({
                where: {
                    doctorId: data?.doctorId,
                    statusId: 'S2',
                    patientId: data?.patientId,
                    timeType: data?.timeType,
                },
            });
            if (!currentPatient) {
                return resolve({
                    errCode: 1,
                    message: 'Patient is not exist !',
                });
            }
            (currentPatient.statusId = 'S3'),
                confirmEmail({
                    receiveEmail: data?.email,
                    fullName: data?.fullName,
                    imageFile: data?.image,
                });
            await currentPatient.save();
            resolve({
                errCode: 0,
                message: 'Ok'
            })
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    sendEmail,
    handleVerifyBooking,
    handleConfirmBooking,
};
