export default createBrowserRouter([
    {
        path: '*',
        element: (<div>Burası Ana sayfa olacak</div>)
    }, {
        path: '/signup',
        Component: SignUp
    },
]);