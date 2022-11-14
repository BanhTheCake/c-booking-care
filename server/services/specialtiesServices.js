const db = require('../models');

const handleCreateNewSpecialty = ({ name, image, description }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentSpecialty = await db.Specialties.findOne({
                where: { name },
            });
            if (currentSpecialty) {
                return resolve({
                    errCode: 1,
                    message: 'Specialty has been exist !',
                });
            }
            await db.Specialties.create({
                name,
                image,
                description,
            });
            resolve({
                errCode: 0,
                message: 'Ok',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await db.Specialties.findAll({ raw: true });
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

// Get specialties and doctor
const handleGetSpecialtyByIdV1 = (id, province) => {
    return new Promise(async (resolve, reject) => {
        const includeObj = {
            model: db.DoctorInfos,
            as: 'doctorListData',
            attributes: ['doctorId', 'provinceId', 'specialtiesId'],
            // required => if don't have => return null for all
            required: false,
        };

        if (province) {
            includeObj.where = { provinceId: province };
        }

        try {
            const currentSpecialty = await db.Specialties.findOne({
                where: { id },
                attributes: [
                    'id',
                    'description',
                    'name',
                    // 'image',
                ],
                include: [includeObj],
                // raw === true => associations hasMany - belongTo will return 1 object (not array)
                nest: true,
            });
            // if (!currentSpecialty) {
            //     return resolve({
            //         errCode: 1,
            //         message: 'Specialty not exist !',
            //     });
            // }
            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentSpecialty,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetSpecialtyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentSpecialty = await db.Specialties.findOne({
                where: { id },
                attributes: [
                    'id',
                    'description',
                    'name',
                    // 'image',
                ],
            });
            if (!currentSpecialty) {
                return resolve({
                    errCode: 1,
                    message: 'Specialty not exist !',
                });
            }
            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentSpecialty,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetDoctorInSpecialty = (id, provinceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentSpecialty = await db.Specialties.findOne({
                where: { id },
            });
            if (!currentSpecialty) {
                return resolve({
                    errCode: 1,
                    message: 'Specialty not exist !',
                });
            }
            let dataDoctor;
            if (provinceId) {
                dataDoctor = await db.DoctorInfos.findAll({
                    where: { specialtiesId: id, provinceId: provinceId },
                    attributes: ['doctorId', 'provinceId', 'specialtiesId'],
                });
            } else {
                dataDoctor = await db.DoctorInfos.findAll({
                    where: { specialtiesId: id },
                    attributes: ['doctorId', 'provinceId', 'specialtiesId'],
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
    handleCreateNewSpecialty,
    handleGetAllSpecialties,
    handleGetSpecialtyById,
    handleGetDoctorInSpecialty,
};
