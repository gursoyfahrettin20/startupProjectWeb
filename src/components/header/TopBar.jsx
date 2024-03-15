import React from "react";
import logo from "@/assets/vite.svg"
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "./index.css"
import {Link} from "react-router-dom";
import {usePropState, usePropDispatch} from "@/shared/context";
import ProfileImage from "@/components/header/ProfileImage.jsx";

const TopBar = () => {
    const {t} = useTranslation();
    const authState = usePropState();
    const dispatch = usePropDispatch();

    const onHandlerLogout = () => {
        dispatch({type: "logout-success", data: {}});
    }

    return (<div className={"shadow-sm bg-light mb-2"}>
        <nav className="navbar navbar-light navbar-expand container">
            <div className='container'>
                <div className={"row"} style={{display: "contents"}}>
                    <div className={"col-8"}>
                        <Link className="navbar-brand" to={"/"}>
                            <img src={logo} width={60} alt={"Empty Project"} title={"Empty Project"}/>
                            Empty Project - web
                        </Link>
                    </div>
                    <div className={"col-2"}>
                        <ul className="navbar-nav navbar-right" style={{float: "right", marginTop: "-15px"}}>
                            {authState.id == 0 ? <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>{t("login")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/singup"}>{t("singUp")}</Link>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/user/${authState.id}`}>
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
                                                  onClick={() => onHandlerLogout()}>{t("logout")}</span>
                                </li>
                            </>}
                        </ul>
                    </div>
                    <div className={"col-2"}>
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
        </nav>
    </div>);
}

export default TopBar;
