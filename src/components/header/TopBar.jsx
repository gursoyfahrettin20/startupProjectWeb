import logo from "@/assets/vite.svg"
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "./index.css"
import {Link, useNavigate} from "react-router-dom";
import {usePropState, usePropDispatch} from "@/shared/context";
import ProfileImage from "@/components/Image/ProfileImage.jsx";
import {logout} from "@/api/apiCalls.js";
import {useEffect} from "react";
import {loadAuthState} from "@/shared/localStorage.js";
import {Col, Row} from "antd";

const TopBar = () => {
    const {t} = useTranslation();
    const authState = usePropState();
    const dispatch = usePropDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const _isLogin = loadAuthState();
        if (_isLogin.id === 0) {
            navigate("/adminPanel/login");
        }
    }, []);

    const onHandlerLogout = async () => {
        try {
            await logout();
            location.reload();
        } catch (e) {

        } finally {
            dispatch({type: "logout-success", data: {}});
        }
    }

    return (
        <div className={"shadow-sm bg-light"}>
            <nav className="navbar navbar-light navbar-expand">
                <div className='header-container' style={{display: "contents"}}>
                    <Row gutter={16} style={{display: "contents"}}>
                        <Col span={16}>
                            <Link className="navbar-brand" to={"/adminPanel"}>
                                <img src={logo} width={60} alt={"Empty Project"} title={"Empty Project"}/>
                                Empty Project - web
                            </Link>
                        </Col>
                        <Col className="gutter-row" span={8} style={{textAlign: "right", padding:"0 20px"}}>
                            <ul className="navbar-nav navbar-right" style={{float: "right", marginTop: "-15px"}}>
                                {authState.id === 0 ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/adminPanel/login"}>{t("login")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/adminPanel/singUp"}>{t("singUp")}</Link>
                                    </li>
                                </> : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/adminPanel/user/${authState.id}`}>
                                            {<>
                                                <ProfileImage style={{width: 20, height: 20}} image={authState.image}/>
                                                <span className={"ms-2"}>
                                                 {authState.username}
                                            </span>
                                            </>}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                    <span className="nav-link" role="button"
                                          onClick={() => onHandlerLogout()}>
                                        {t("logout")}
                                    </span>
                                    </li>
                                    <li>
                                        <LanguageSelector/>
                                    </li>
                                </>}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </nav>
        </div>
    );
}

export default TopBar;
