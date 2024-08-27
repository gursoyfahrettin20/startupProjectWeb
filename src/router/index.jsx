import {createBrowserRouter} from 'react-router-dom'
import SignUp from "@/pages/SingUp"
import App from "@/App"
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
import OurWeb from "@/pages/OurWeb/index.jsx";
import MainPage from "@/pages/MainPage/index.jsx";
import Product from "@/pages/Product/index.jsx";
import Categories from "@/pages/Product/Categories.jsx";
import References from "@/pages/Referances/index.jsx";
import ReferencesCategories from "@/pages/Referances/Categories.jsx";
import Content from "@/pages/Content/index.jsx";
import News from "@/pages/News/index.jsx";
import Dashboard from "@/pages/Dashboard/index.jsx";

export default createBrowserRouter([
    {
        path: '/adminPanel',
        Component: App,
        children: [
            // web panel ile alakalı url listesi
            {
                path: '/adminPanel',
                index: true,
                Component: Dashboard,
            }, {
                path: '/adminPanel/login',
                Component: Login
            }, {
                path: '/adminPanel/singUp',
                Component: SignUp
            }, {
                path: '/adminPanel/activation/:token',
                Component: Activation
            }, {
                path: '/adminPanel/password-reset/request',
                Component: PasswordResetRequest
            }, {
                path: '/adminPanel/contact',
                Component: Contact
            }, {
                path: '/adminPanel/aboutUs',
                element: localStorage.lang === 'tr' ? <OurWeb id={1} elementName={"aboutUs"}/> :
                    <OurWeb id={2} elementName={"aboutUs"}/>
            },{
                path: '/adminPanel/ourVision',
                element: localStorage.lang === 'tr' ? <OurWeb id={3} elementName={"ourVision"}/> :
                    <OurWeb id={4} elementName={"ourVision"}/>
            }, {
                path: '/adminPanel/ourMission',
                element: localStorage.lang === 'tr' ? <OurWeb id={5} elementName={"ourMission"}/> :
                    <OurWeb id={6} elementName={"ourMission"}/>
            },  {
                path: '/adminPanel/categories',
                Component: Categories
            }, {
                path: '/adminPanel/product',
                Component: Product
            }, {
                path: '/adminPanel/referencesCategories',
                Component: ReferencesCategories
            }, {
                path: '/adminPanel/referencesList',
                Component: References
            }, {
                path: '/adminPanel/content',
                Component: Content
            }, {
                path: '/adminPanel/news',
                Component: News
            }, {
                path: '/adminPanel/slider',
                Component: Slider
            }, {
                path: '/adminPanel/user/:id',
                Component: User
            }, {
                path: '/adminPanel/userList',
                Component: UserList
            }, {
                path: '/adminPanel/userAdministratorPage',
                Component: UserAdministrator
            }, {
                path: '/adminPanel/mailSettings',
                Component: MailSettings
            }, {
                path: '/adminPanel/siteSettings',
                Component: SiteSettings
            }, {
                path: '/adminPanel/mainPage',
                element: localStorage.lang === 'tr' ? <MainPage id={7} elementName={"mainPage"}/> :
                    <MainPage id={8} elementName={"mainPage"}/>
            }, {
                path: '/adminPanel/mainHeadline',
                element: localStorage.lang === 'tr' ? <MainPage id={9} elementName={"mainHeadline"}/> :
                    <MainPage id={10} elementName={"mainHeadline"}/>
            }, {
                path: '/adminPanel/breakHeadline',
                element: localStorage.lang === 'tr' ? <MainPage id={11} elementName={"breakHeadline"}/> :
                    <MainPage id={12} elementName={"breakHeadline"}/>
            }, {
                path: '/adminPanel/lastHeadline',
                element: localStorage.lang === 'tr' ? <MainPage id={13} elementName={"lastHeadline"}/> :
                    <MainPage id={14} elementName={"lastHeadline"}/>
            }, {
                path: '/adminPanel/x',
                element: localStorage.lang === 'tr' ? <OurWeb id={15} elementName={"x"}/> :
                    <OurWeb id={16} elementName={"x"}/>
            }, {
                path: '/adminPanel/facebook',
                element: localStorage.lang === 'tr' ? <OurWeb id={17} elementName={"facebook"}/> :
                    <OurWeb id={18} elementName={"facebook"}/>
            }, {
                path: '/adminPanel/linkedin',
                element: localStorage.lang === 'tr' ? <OurWeb id={19} elementName={"linkedin"}/> :
                    <OurWeb id={20} elementName={"linkedin"}/>
            }, {
                path: '/adminPanel/google',
                element: localStorage.lang === 'tr' ? <OurWeb id={21} elementName={"google"}/> :
                    <OurWeb id={22} elementName={"google"}/>
            }, {
                path: '/adminPanel/youtube',
                element: localStorage.lang === 'tr' ? <OurWeb id={23} elementName={"youtube"}/> :
                    <OurWeb id={24} elementName={"youtube"}/>
            }
        ]
    }
]);