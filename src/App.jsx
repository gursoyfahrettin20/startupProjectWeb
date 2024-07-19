import TopBar from "./components/header/TopBar"
import {AuthenticationContext} from '@/shared/store';
import {Layout} from 'antd';
import Home from "@/pages/index.jsx";
import LeftMenu from "@/components/leftMenu/index.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loadAuthState} from "@/shared/localStorage.js";
import {usePropState} from "@/shared/context.jsx";

const {Header, Footer, Sider, Content} = Layout;

function App() {
    const [isLogin, setIsLogin] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const _isLogin = loadAuthState();
        setIsLogin(_isLogin.id);
    });

    useEffect(() => {
        const _isLogin = loadAuthState();
        if (_isLogin.id === 0) {
            navigate("/adminPanel/login")
        }
    }, [isLogin]);


    return (
        <AuthenticationContext>
            <TopBar/>
            <Layout>
                {isLogin !== 0 && <Sider width={"300px"} className={"leftMenu shadow-sm bg-light"}>
                    <LeftMenu/>
                </Sider>
                }
                <Content>
                    <Home/>
                </Content>
            </Layout>
            <Footer>Fahrettin Gürsoy - 0536 995 73 39</Footer>
        </AuthenticationContext>
    );
}

export default App;