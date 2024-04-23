import {createBrowserRouter} from 'react-router-dom'
import SignUp from "@/pages/SingUp"
import App from "@/App"
import Dashboard from "@/pages/Dashboard/index.jsx"
import Login from "@/pages/Login"
import UserList from "@/pages/UserList";
import {Activation} from '@/pages/Activation'
import User from '@/pages/User'
import PasswordResetRequest from "@/pages/PasswordReset/Request/index.jsx";
import UserAdministrator from "@/pages/UserAdministrator/index.jsx";
import MailSettings from "@/pages/MailSettings/index.jsx";
import SiteSettings from "@/pages/SiteSettings/index.jsx";
import Slider from "@/pages/Slider/index.jsx";
import Contact from "@/pages/Contact/index.jsx";
import OurMission from "@/pages/OurMission/index.jsx";
import OurVision from "@/pages/OurVision/index.jsx";
import AboutUs from "@/pages/AboutUs/index.jsx";
import Product from "@/pages/Product/index.jsx";
import Content from "@/pages/Content/index.jsx";
import News from "@/pages/News/index.jsx";

export default createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            // web panel ile alakalı url listesi
            {
                path: '/',
                index: true,
                Component: Dashboard,
            }, {
                path: '/login',
                Component: Login
            }, {
                path: '/singUp',
                Component: SignUp
            }, {
                path: '/activation/:token',
                Component: Activation
            }, {
                path: '/user/:id',
                Component: User
            }, {
                path: '/password-reset/request',
                Component: PasswordResetRequest
            }, {
                path: '/contact',
                Component: Contact
            }, {
                path: '/ourMission',
                Component: OurMission
            }, {
                path: '/ourVision',
                Component: OurVision
            }, {
                path: '/aboutUs',
                Component: AboutUs
            }, {
                path: '/product',
                Component: Product
            }, {
                path: '/content',
                Component: Content
            }, {
                path: '/news',
                Component: News
            }, {
                path: '/slider',
                Component: Slider
            }, {
                path: '/userList',
                Component: UserList
            }, {
                path: '/userList',
                Component: UserList
            }, {
                path: '/userAdministratorPage',
                Component: UserAdministrator
            }, {
                path: '/mailSettings',
                Component: MailSettings
            }, {
                path: '/siteSettings',
                Component: SiteSettings
            },
        ]
    }
]);