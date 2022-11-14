const { handleGetTopDoctor, handleGetAllDoctor, handleUpdateInfoDoctor, handleGetDetailsDoctor, handleGetMarkdownDoctor, handleBulkCreateSchedule, handleGetScheduleHour, handleGetDaySchedule, handleGetDoctorInfo, handleGetPatientOfDoctor } = require("../services/doctorServices");

const getTopDoctor = async (req, res, next) => {
    try {
        const limit = req.query?.limit || 10
        const resData = await handleGetTopDoctor(Number(limit))
        return res.status(200).json(resData) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getAllDoctor = async (req, res, next) => {
    try {
    const resData = await handleGetAllDoctor()
    return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const updateInfoDoctor = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'DoctorId is missing !'
            })
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                errCode: -1,
                message: 'Data is missing !'
            })
        }
        const resData = await handleUpdateInfoDoctor(id, data)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getDetailsDoctor =  async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters id !'
            })
        }
        const resData = await handleGetDetailsDoctor(id)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server'
        })
    }
}

const getMarkdownDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing params id !'
            })
        }
        const resData = await handleGetMarkdownDoctor(id)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const bulkCreateSchedule = async (req, res, next) => {
    try {
        const { doctorId, selectDay, hourData } = req.body
        if (!doctorId || !selectDay || !hourData) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameter !'
            })
        }
        const resData = await handleBulkCreateSchedule({ doctorId, date: selectDay, hourData })
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getScheduleHour = async (req, res, next) => {
    try {
        const { doctorId, date } = req.query
        if (!doctorId || !date) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters !'
            })
        }
        const resData = await handleGetScheduleHour({ doctorId, date })
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getDaySchedule = async (req, res, next) => {
    try {
        const { doctorId } = req.query
        if (!doctorId) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing doctorId to define !'
            })
        }
        const resData = await handleGetDaySchedule(doctorId)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const getDoctorInfo = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing doctorId !'
            })
        } 
        const resData = await handleGetDoctorInfo(id)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
} 

const getPatientOfDoctor = async (req, res) => {
    try {
        const { doctorId, date } = req.query
        if (!doctorId || !date) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameter !'
            })
        }
        const resData = await handleGetPatientOfDoctor(doctorId, date)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

module.exports = { getTopDoctor, getAllDoctor, updateInfoDoctor, getDetailsDoctor, getMarkdownDoctor, bulkCreateSchedule, getScheduleHour, getDaySchedule, getDoctorInfo, getPatientOfDoctor }