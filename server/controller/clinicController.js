const db = require("../models")
const { handleCreateNewClinic, handleGetAllClinic, handleGetClinicById, handleGetDoctorInClinic } = require("../services/clinicServices")

const createNewClinic = async (req, res) => {
    try {
        const { address, description, image, name } = req.body
        if (!address || !description || !image || !name) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameter !'
            })
        }
        const resData = await handleCreateNewClinic({ address, description, image, name })
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getAllClinic = async (req, res) => {
    try {
        const resData = await handleGetAllClinic()
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getClinicById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameter !'
            })
        }
        const resData = await handleGetClinicById(id)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getDoctorInClinic = async (req, res) => {
    try {
        const { id } = req.params
        const { provinceId } = req.query
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameter !'
            })
        }
        const resData = await handleGetDoctorInClinic(id, provinceId)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}
 
module.exports = { createNewClinic, getAllClinic, getClinicById, getDoctorInClinic }