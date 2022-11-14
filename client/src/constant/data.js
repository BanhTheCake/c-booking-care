import Img4 from '../assets/image/120741-tim-mach.jpg'
import Img3 from '../assets/image/120933-tieu-hoa.jpg'
import Img2 from '../assets/image/121042-than-kinh.jpg'
import Img5 from '../assets/image/121146-tai-mui-hong.jpg'
import Img6 from '../assets/image/121215-cot-song.jpg'
import Img7 from '../assets/image/121232-y-hoc-co-truyen.jpg'
import Img8 from '../assets/image/121305-cham-cuu.jpg'
import Img10 from '../assets/image/181619-sieu-am-thai.jpg'
import Img9 from '../assets/image/181822-san-phu-khoa.jpg'
import Img1 from '../assets/image/co-xuong-khop.jpg'

export const popularSpecialties = [
    {img: Img1, text: "homePage.musculoskeletal" },
    {img: Img2, text: "homePage.nerve" },
    {img: Img3, text: "homePage.digestion" },
    {img: Img4, text: "homePage.heart" },
    {img: Img5, text: "homePage.ear_nose_throat" },
    {img: Img6, text: "homePage.spine" },
    {img: Img7, text: "homePage.traditional_medicine" },
    {img: Img8, text: "homePage.acupuncture" },
    {img: Img9, text: "homePage.obstetrics_gynecology" },
    {img: Img10, text: "homePage.pregnancy_ultrasound" },
]

export const menuSystem = [
    {
        // Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            { name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },
            { name: 'menu.doctor.manage-schedule', link: '/system/user-schedule' },
        ],
    },
    {
        // Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
                // subMenus: [
                //     { name: 'menu.admin.crud', link: '/system/user-manage' },
                // ]
            },
        ],
    },
    {
        // Quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty',
            },
        ],
    },
    {
        // Quản lý cẩm năng
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook',
            },
        ],
    },
];

export const doctorSystem = [
    {
        // Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.doctor.manage-schedule', link: '/system/user-schedule' },
            { name: 'menu.doctor.manage-patient', link: '/system/user-patient' },
        ],
    }
];