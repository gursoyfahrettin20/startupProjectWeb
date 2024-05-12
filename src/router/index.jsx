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
import OurWeb from "@/pages/OurWeb/index.jsx";
import MainPage from "@/pages/MainPage/index.jsx";
import Product from "@/pages/Product/index.jsx";
import Categories from "@/pages/Product/Categories.jsx";
import Content from "@/pages/Content/index.jsx";
import News from "@/pages/News/index.jsx";
import ProductNews from "@/pages/Product/ProductNews.jsx";

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
                path: '/password-reset/request',
                Component: PasswordResetRequest
            }, {
                path: '/contact',
                Component: Contact
            }, {
                path: '/ourMission',
                element: <OurWeb id={1} elementName={"ourMission"}/>
            }, {
                path: '/ourVision',
                element: <OurWeb id={2} elementName={"ourVision"}/>
            }, {
                path: '/aboutUs',
                element: <OurWeb id={3} elementName={"aboutUs"}/>
            }, {
                path: '/categories',
                Component: Categories
            }, {
                path: '/product',
                Component: Product
            }, {
                path: '/productNews',
                Component: ProductNews
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
                path: '/user/:id',
                Component: User
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
            }, {
                path: '/mainPage',
                element: <MainPage id={4} elementName={"mainPage"}/>
            }, {
                path: '/mainHeadline',
                element: <MainPage id={5} elementName={"mainHeadline"}/>
            }, {
                path: '/breakHeadline',
                element: <MainPage id={6} elementName={"breakHeadline"}/>
            }, {
                path: '/lastHeadline',
                element: <MainPage id={7} elementName={"lastHeadline"}/>
            },
        ]
    }
]);