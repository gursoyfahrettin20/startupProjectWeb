import { createBrowserRouter } from 'react-router-dom'
import SignUp from "@/pages/SingUp"
import App from "@/App"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import { Activation } from '@/pages/Activation'
import User from '@/pages/User'

export default createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            // web panel ile alakalı url listesi
            {
                path: '/',
                index: true,
                Component: Home,
            }, {
                path: '/iletisim',
                element: (<div>İletişim Sayfası</div>)
            },
            {
                path: '/login',
                Component: Login
            }, {
                path: '/singup',
                Component: SignUp
            }, {
                path: '/activation/:token',
                Component: Activation
            }, {
                path: '/user/:id',
                Component: User
            },
        ]
    }
]);