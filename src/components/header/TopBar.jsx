import React from "react";
import logo from "@/assets/vite.svg"
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "./index.css"
import { Link } from "react-router-dom";

const TopBar = () => {
    const { t } = useTranslation();

    return (
        <div className={"shadow-sm bg-light mb-2"}>
            <nav className="navbar navbar-light navbar-expand container">
                <div className='container'>
                    <div className={"row"} style={{ display: "contents" }}>
                        <div className={"col-8"}>
                            <Link className="navbar-brand" to={"/"}>
                                <img src={logo} width={60} alt={"Empty Project"} title={"Empty Project"} />
                                Empty Project - web
                            </Link>
                        </div>
                        <div className={"col-2"}>
                            <ul className="navbar-nav navbar-right" style={{float:"right", marginTop:"-15px"}}>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>{t("login")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/singup"}>{t("singUp")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={"col-2"}>
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TopBar;
