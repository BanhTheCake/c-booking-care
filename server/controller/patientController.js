const { handleGetBookAppointment } = require("../services/patientServices")

const getBookAppointment = async (req, res) => {
    try {
        const { email, doctorId, date, timeType } = req.body
        if (!email || !doctorId || !date || !timeType) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters !'
            })
        }
        const resData = await handleGetBookAppointment(req.body)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

module.exports = { getBookAppointment }