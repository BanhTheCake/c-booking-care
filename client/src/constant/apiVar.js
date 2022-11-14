const urlBase = 'http://localhost:3002';

const urlLogin = `${urlBase}/auth/login`;
const urlLogout = `${urlBase}/auth/logout`;
const urlRefreshToken = `${urlBase}/auth/refreshAccessToken`;

const urlGetAllCodes = `${urlBase}/getAllCodes`;
const urlGetDataUser = `${urlBase}/getDataUser`;
const urlGetAllUser = `${urlBase}/getAllUser`;
const urlCreateNewUser = `${urlBase}/createNewUser`;
const urlDeleteUser = `${urlBase}/deleteUser`;
const urlUpdateUser = `${urlBase}/updateSelectUser`;

const urlGetTopDoctor = `${urlBase}/doctor/getTopDoctor`
const urlGetAllDoctor = `${urlBase}/doctor/getAllDoctor`
const urlUpdateOrCreateDoctor = `${urlBase}/doctor/updateInfoDoctor`
const urlGetMarkdownDoctor = `${urlBase}/doctor/getMarkdownDoctor`
const urlGetDetailsDoctor = `${urlBase}/doctor/getDetailsDoctor`
const urlBulkCreateSchedule = `${urlBase}/doctor/bulkCreateSchedule`
const urlGetDaySchedule = `${urlBase}/doctor/getDaySchedule`
const urlGetScheduleHour = `${urlBase}/doctor/getScheduleHour`
const urlGetDoctorInfo = `${urlBase}/doctor/getDoctorInfo`
const urlGetPatientDoctor = `${urlBase}/doctor/getPatientOfDoctor`

const urlBookAppointment = `${urlBase}/patient/getBookAppointment`

const urlVerifyBooking = `${urlBase}/email/verifyBooking`
const urlConfirmBooking = `${urlBase}/email/confirmBooking`

const urlCreateNewSpecialty = `${urlBase}/specialties/createNewSpecialty`
const urlGetAllSpecialties = `${urlBase}/specialties/getAllSpecialties`
const urlGetSpecialty = `${urlBase}/specialties/getSpecialtyById`
const urlGetDoctorInSpecialty = `${urlBase}/specialties/getDoctorInSpecialty`

const urlCreateNewClinic = `${urlBase}/clinic/createNewClinic`
const urlGetAllClinic = `${urlBase}/clinic/getAllClinic`
const urlGetClinicById = `${urlBase}/clinic/getClinicById`
const urlGetDoctorInClinic = `${urlBase}/clinic/getDoctorInClinic`


export {
    urlLogin,
    urlGetDataUser,
    urlGetAllUser,
    urlRefreshToken,
    urlLogout,
    urlGetAllCodes,
    urlCreateNewUser,
    urlDeleteUser,
    urlUpdateUser,
    urlGetTopDoctor,
    urlGetAllDoctor,
    urlUpdateOrCreateDoctor,
    urlGetMarkdownDoctor,
    urlGetDetailsDoctor,
    urlBulkCreateSchedule,
    urlGetDaySchedule,
    urlGetScheduleHour,
    urlGetDoctorInfo,
    urlBookAppointment,
    urlVerifyBooking,
    urlCreateNewSpecialty,
    urlGetAllSpecialties,
    urlGetSpecialty,
    urlGetDoctorInSpecialty,
    urlCreateNewClinic,
    urlGetAllClinic,
    urlGetClinicById,
    urlGetDoctorInClinic,
    urlGetPatientDoctor,
    urlConfirmBooking
};
