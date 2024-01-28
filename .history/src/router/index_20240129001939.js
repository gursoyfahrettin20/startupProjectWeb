import { createBrowserRouter } from 'react-router-dom'
import SignUp from "../adminPanel/SignUp"

export default createBrowserRouter([
    {
        path: '*',
        element: (<div>Burası Ana sayfa olacak</div>)
    }, {
        path: '/signup',
        Component: SignUp
    },
]);