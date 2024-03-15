import {Outlet} from 'react-router-dom'
import TopBar from "./components/header/TopBar"
import {AuthenticationContext} from '@/shared/store';

function App() {

    return (
        <AuthenticationContext>
            <TopBar/>
            <div className='container mt-3'>
                <Outlet/>
            </div>
        </AuthenticationContext>
    );d
}

export default App;