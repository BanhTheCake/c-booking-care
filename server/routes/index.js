const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const doctorRouter = require('./doctorRouter')
const patientRouter = require('./patientRouter')
const emailRouter = require('./emailRouter')
const specialtiesRouter = require('./specialtiesRoutes')
const clinicRouter = require('./clinicRouter')

const initRouter = (app) => {
    app.use('/auth', authRouter)
    app.use('/doctor', doctorRouter)
    app.use('/patient', patientRouter)
    app.use('/email', emailRouter)
    app.use('/specialties', specialtiesRouter)
    app.use('/clinic', clinicRouter)
    app.use('/', userRouter)
}

module.exports = initRouter