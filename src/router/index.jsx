import { createBrowserRouter } from 'react-router-dom'
import SignUp from "../adminPanel/SignUp"
import App from "../App"
import Home from "../web/Home/index"
import Login from "../adminPanel/Login/index"

export default createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            // web panel ile alakalı url listesi
            {
                path: '/',
                index: true,
                Component: Home
            }, {
                path: '/iletisim',
                element: (<div>İletişim Sayfası</div>)
            },
            // Admin panel ile alakalı url listesi
            {
                path: '/login',
                Component: Login
            }, {
                path: '/signup',
                Component: SignUp
            },
        ]
    }
]);