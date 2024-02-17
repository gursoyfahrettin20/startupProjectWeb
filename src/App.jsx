import { Outlet } from 'react-router-dom'
import TopBar from "./components/header/TopBar"
import { AuthenticationContex } from '@/shared/store';

function App() {

    return (
        <AuthenticationContex>
            <TopBar />
            <div className='container mt-3'>
                <Outlet />
            </div>
        </AuthenticationContex>
    );
}

export default App;