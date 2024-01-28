import { Outlet } from 'react-router-dom'
import TopBar from "./components/web/header/TopBar"

function App() {

    return (
        <>
            <TopBar />
            <div className='container mt-3'>
                <Outlet />
            </div>
        </>
    );
}

export default App;