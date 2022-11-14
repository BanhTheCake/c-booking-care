const { handleCreateNewSpecialty, handleGetAllSpecialties, handleGetSpecialtyById, handleGetDoctorInSpecialty } = require("../services/specialtiesServices")

const createNewSpecialty = async (req, res) => {
    try {
        const { name, image, description } = req.body
        if(!name || !image || !description) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters !'
            })
        }
        const resData = await handleCreateNewSpecialty({ name, image, description })
        return res.status(200).json(resData)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getAllSpecialties = async (req, res) => {
    try {
        const resData = await handleGetAllSpecialties()
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Something wrong with server !'
        })
    }
}

const getSpecialtyById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing specialty id !'
            })
        }
        const resData = await handleGetSpecialtyById(id)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getDoctorInSpecialty = async (req, res) => {
    try {
        const { id } = req.params
        const { provinceId } = req.query
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing specialty id !'
            })
        }
        const resData = await handleGetDoctorInSpecialty(id, provinceId)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

module.exports = { createNewSpecialty, getAllSpecialties, getSpecialtyById, getDoctorInSpecialty };
