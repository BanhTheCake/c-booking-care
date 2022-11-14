const db = require('../models');

const handleCreateNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentClinic = await db.Clinics.findOne({
                where: { name: data.name },
            });
            if (!currentClinic) {
                await db.Clinics.create({
                    name: data.name,
                    address: data.address,
                    description: data.description,
                    image: data.image,
                });
                return resolve({
                    errCode: 0,
                    message: 'Create done',
                });
            }
            currentClinic.name = data.name;
            currentClinic.address = data.address;
            currentClinic.description = data.description;
            currentClinic.image = data.image;
            await currentClinic.save();
            return resolve({
                errCode: 0,
                message: 'Update done',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Clinics.findAll({ limit: 10 });
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

const handleGetClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Clinics.findOne({
                where: { id: id },
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

const handleGetDoctorInClinic = (id, provinceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentClinic = await db.Clinics.findOne({
                where: { id },
            });
            if (!currentClinic) {
                return resolve({
                    errCode: 1,
                    message: 'Clinic not exist !',
                });
            }
            let dataDoctor;
            if (provinceId) {
                dataDoctor = await db.DoctorInfos.findAll({
                    where: { clinicId: id, provinceId: provinceId },
                    attributes: ['doctorId', 'provinceId', 'clinicId'],
                });
            } else {
                dataDoctor = await db.DoctorInfos.findAll({
                    where: { clinicId: id },
                    attributes: ['doctorId', 'provinceId', 'clinicId'],
                });
            }
            resolve({
                errCode: 0,
                message: 'Ok',
                data: dataDoctor,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleCreateNewClinic,
    handleGetAllClinic,
    handleGetClinicById,
    handleGetDoctorInClinic,
};
