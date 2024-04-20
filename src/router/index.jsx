import { createBrowserRouter } from 'react-router-dom'
import SignUp from "@/pages/SingUp"
import App from "@/App"
import Dashboard from "@/pages/Dashboard/index.jsx"
import Login from "@/pages/Login"
import UserList from "@/pages/UserList";
import { Activation } from '@/pages/Activation'
import User from '@/pages/User'
import PasswordResetRequest from "@/pages/PasswordReset/Request/index.jsx";

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
                path: '/iletisim',
                element: (<div>İletişim Sayfası</div>)
            },
            {
                path: '/login',
                Component: Login
            },{
                path: '/userList',
                Component: UserList
            }, {
                path: '/singup',
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
            },
        ]
    }
]);