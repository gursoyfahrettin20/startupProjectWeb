import React from "react";
import logo from "../../../assets/vite.svg"
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "./index.css"
import { Link } from "react-router-dom";

const TopBar = () => {
    const {t} = useTranslation();

    return (
        <div className={"shadow-sm bg-light mb-2"}>
            <nav className="navbar navbar-light navbar-expand container">
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-10"}>
                        <Link className="navbar-brand" to={"/"}>
                            <img src={logo} width={60} alt={"HOAX Empty Project"} title={"HOAX Empty Project"}/>
                            Empty Project - Admin
                        </Link>
                    </div>
                    <div className={"col-1"}>
                        <LanguageSelector/>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TopBar;
