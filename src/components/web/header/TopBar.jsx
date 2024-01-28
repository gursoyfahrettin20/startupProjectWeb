import React from "react";
import logo from "../../../assets/vite.svg"
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "./index.css"
import { Link } from "react-router-dom";

const TopBar = () => {
    const { t } = useTranslation();

    return (
        <div className={"shadow-sm bg-light mb-2"}>
            <nav className="navbar navbar-light navbar-expand container">
                <div className={"row"} style={{ width: "100%" }}>
                    <div className={"col-8"}>
                        <Link className="navbar-brand" to={"/"}>
                            <img src={logo} width={60} alt={"HOAX Empty Project"} title={"HOAX Empty Project"} />
                            Empty Project - web
                        </Link>
                    </div>
                    <div className={"col"}>
                        <LanguageSelector />
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/signup"}>{t("singUp")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TopBar;
