const db = require('../models/index');
const dayjs = require('dayjs');
const _ = require('lodash');

const handleGetTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Users.findAll({
                where: { roleId: 'R2' },
                limit: limit,
                attributes: { exclude: ['password'] },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.AllCodes,
                        as: 'roleData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                    {
                        model: db.AllCodes,
                        as: 'positionData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                ],
                nest: true,
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                data: resData,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Users.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ['password', 'image'] },
                order: [['createdAt', 'DESC']],
                raw: true,
            });
            resolve({
                errCode: 0,
                message: 'OK',
                data: resData,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleUpdateInfoDoctor = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await db.Users.findOne({ where: { id } });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User is not exist !',
                });
            }

            const markDownData = {
                doctorId: data?.doctorId,
                contentMarkdown: data?.contentMarkdown,
                description: data?.description,
            };
            const doctorInfoData = {
                doctorId: data?.doctorId,
                priceId: data?.priceId,
                paymentId: data?.paymentId,
                provinceId: data?.provinceId,
                nameClinic: data?.nameClinic,
                addressClinic: data?.addressClinic,
                note: data?.note,
                specialtiesId: +data?.specialtiesId,
                clinicId: data?.clinicId,
            };

            const [currentMarkdown, currentDoctorInfo] = await Promise.all([
                db.Markdowns.findOne({
                    where: { doctorId: id },
                }),
                db.DoctorInfos.findOne({
                    where: { doctorId: id },
                }),
            ]);

            let markDownDataReq;
            let doctorInfoReq;

            // Create or update Markdown
            if (!currentMarkdown) {
                markDownDataReq = db.Markdowns.create(
                    { ...markDownData },
                    { raw: true }
                );
            } else {
                markDownDataReq = db.Markdowns.update(
                    { ...markDownData },
                    { where: { doctorId: id } }
                );
            }

            // Create or update doctorInfo
            if (!currentDoctorInfo) {
                doctorInfoReq = db.DoctorInfos.create(
                    { ...doctorInfoData },
                    { raw: true }
                );
            } else {
                doctorInfoReq = db.DoctorInfos.update(
                    { ...doctorInfoData },
                    { where: { doctorId: id } }
                );
            }

            await Promise.all([markDownDataReq, doctorInfoReq]);

            resolve({
                errCode: 0,
                message: 'Ok',
                data: [],
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetDetailsDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentDoctor = await db.Users.findOne({
                where: { id },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: db.Markdowns,
                        attributes: [
                            'contentMarkdown',
                            'description',
                            'doctorId',
                            'id',
                        ],
                    },
                    {
                        model: db.AllCodes,
                        as: 'positionData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentDoctor,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetMarkdownDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.Markdowns.findOne({
                where: { doctorId: id },
                attributes: [
                    'contentMarkdown',
                    'description',
                    'doctorId',
                    'id',
                ],
                include: [
                    {
                        model: db.DoctorInfos,
                        as: 'doctorInfoData',
                        attributes: [
                            'priceId',
                            'paymentId',
                            'provinceId',
                            'nameClinic',
                            'addressClinic',
                            'specialtiesId',
                            'clinicId',
                            'note',
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleBulkCreateSchedule = (reqData) => {
    return new Promise(async (resolve, reject) => {
        const MAX_NUMBER_PATIENT = 10;
        try {
            let { doctorId, date, hourData } = reqData;
            hourData = hourData.map((item) => {
                const { selectDay, ...newItem } = item;
                newItem.date = item.selectDay;
                newItem.maxNumber = MAX_NUMBER_PATIENT;
                return newItem;
            });

            // find current hour in database
            const hourCurrent = await db.Schedules.findAll({
                where: {
                    doctorId,
                    date,
                },
                attributes: [
                    'doctorId',
                    'date',
                    'timeType',
                    'doctorId',
                    'maxNumber',
                ],
                raw: true,
            });

            // find different between hourCurrent and hourData => get data unique
            let dataCreate = hourData;
            if (hourCurrent?.length !== 0) {
                const hourCompare = hourCurrent.map((item) => {
                    const newItem = { ...item };
                    // convert string => number to compare
                    newItem.date = +item.date;
                    return newItem;
                });
                dataCreate = _.differenceWith(hourData, hourCompare, _.isEqual);
            }
            const resData = await db.Schedules.bulkCreate(dataCreate);
            resolve({
                errCode: 0,
                message: 'ok',
                data: resData,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetScheduleHour = ({ doctorId, date }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Schedules.findAll({
                where: { doctorId, date },
                include: [
                    {
                        model: db.AllCodes,
                        as: 'timeTypeData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                ],
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                data: resData,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetDaySchedule = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Schedules.findAll({
                where: { doctorId },
                order: [['date', 'ASC']],
                attributes: ['doctorId', 'date'],
                group: ['date'],
                raw: true,
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                data: resData,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetDoctorInfo = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.DoctorInfos.findOne({
                where: { doctorId },
                attributes: [
                    'doctorId',
                    'priceId',
                    'paymentId',
                    'provinceId',
                    'addressClinic',
                    'nameClinic',
                    'note',
                ],
                include: [
                    {
                        model: db.AllCodes,
                        as: 'priceData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                    {
                        model: db.AllCodes,
                        as: 'paymentData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                    {
                        model: db.AllCodes,
                        as: 'provinceData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                ],
            });
            resolve({
                errCode: 0,
                message: 'Ok',
                data: resData,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetPatientOfDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const patientData = await db.Bookings.findAll({
                where: { statusId: 'S2', doctorId: doctorId, date: date },
                include: [
                    {
                        model: db.Users,
                        as: 'patientData',
                        attributes: ['email', 'firstName', 'address', 'gender'],
                        include: [
                            {
                                model: db.AllCodes,
                                as: 'genderData',
                                attributes: ['valueEN', 'valueVI'],
                            },
                        ]
                    },
                    {
                        model: db.AllCodes,
                        as: 'timeTypePatientData',
                        attributes: ['valueEN', 'valueVI'],
                    },
                ],
                raw: false,
                nest: true
            });
            return resolve({
                errCode: 0,
                message: 'Ok',
                data: patientData
            })
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleUpdateInfoDoctor,
    handleGetDetailsDoctor,
    handleGetMarkdownDoctor,
    handleBulkCreateSchedule,
    handleGetScheduleHour,
    handleGetDaySchedule,
    handleGetDoctorInfo,
    handleGetPatientOfDoctor,
};
