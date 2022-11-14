import * as yup from 'yup';

const schemaFormRedux = yup
.object({
    email: yup
        .string()
        .email('error.email-verify')
        .required('error.email-required'),
    password: yup.string().required('error.password-required').nullable(),
    firstName: yup.string().required('error.firstName-required').nullable(),
    lastName: yup.string().required('error.lastName-required').nullable(),
    phoneNumber: yup.string().required('error.phoneNumber-required').nullable(),
    address: yup.string().required('error.address-required').nullable(),
    gender: yup.string().required('error.gender-required').nullable(),
    roleId: yup.string().required('error.roleId-required').nullable(),
    positionId: yup.string().required('error.positionId-required').nullable(),
    // yup.mixed(): any type
    inputFile: yup.mixed().required('error.file-required').nullable(),
})
.required();

const schemaFormModalRedux = yup
.object({
    // email: yup
    //     .string()
    //     .email('error.email-verify')
    //     .required('error.email-required').nullable(),
    firstName: yup.string().required('error.firstName-required').nullable(),
    lastName: yup.string().required('error.lastName-required').nullable(),
    phoneNumber: yup.string().required('error.phoneNumber-required').nullable(),
    address: yup.string().required('error.address-required').nullable(),
    gender: yup.string().required('error.gender-required').nullable(),
    roleId: yup.string().required('error.roleId-required').nullable(),
    positionId: yup.string().required('error.positionId-required').nullable(),
    // yup.mixed(): any type
    // inputFile: yup.mixed().required('error.file-required').nullable(),
})
.required();

const schemaManageDoctor = yup
.object({
    priceId: yup.string().required('error.price-required').nullable(),
    paymentId: yup.string().required('error.payment-required').nullable(),
    provinceId: yup.string().required('error.province-required').nullable(),
    nameClinic: yup.string().required('error.nameClinic-required').nullable(),
    addressClinic: yup.string().required('error.addressClinic-required').nullable(),
    contentMarkdown: yup.string().required('error.blog-required').nullable(),
    description: yup.string().required('error.description-required').nullable(),
    specialtiesId: yup.mixed().required('error.description-required').nullable(),
    clinicId: yup.mixed().required('error.description-required').nullable(),
})
.required();

const schemaDoctorDetails = yup
.object({
    name: yup.string().required('error.name-required').nullable(),
    phoneNumber: yup.string().required('error.phoneNumber-required').nullable(),
    email: yup
        .string()
        .email('error.email-verify')
        .required('error.email-required').nullable(),
    address: yup.string().required('error.address-required').nullable(),
    method: yup.string().required('error.method-required').nullable(),
    gender: yup.string().required('error.gender-required').nullable(),
    birthDay: yup.string().required('error.birthDay-required').nullable(),
})
.required();


const schemaManageSpecialties = yup
.object({
    fileSpecialties: yup.mixed().required('error.file-required').nullable(),
    nameSpecialties: yup.string().required('error.nameSpecialties-required').nullable(),
    markdownSpecialties: yup.string().required('error.markdownSpecialties-required').nullable(),
})
.required();

const schemaManageClinic = yup
.object({
    fileClinic: yup.mixed().required('error.file-required').nullable(),
    nameClinic: yup.string().required('error.nameClinic-required').nullable(),
    addressClinic: yup.string().required('error.addressClinic-required').nullable(),
    markdownClinic: yup.string().required('error.markdownSpecialties-required').nullable(),
})
.required();

export { schemaFormRedux, schemaFormModalRedux, schemaManageDoctor, schemaDoctorDetails, schemaManageSpecialties, schemaManageClinic };
