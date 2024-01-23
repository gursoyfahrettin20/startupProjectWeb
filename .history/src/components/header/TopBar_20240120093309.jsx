import React, {useEffect, useRef, useState} from "react";
import logo from "../../assets/react.svg"
import {Link} from "react-router-dom"
import {useTranslation} from "react-i18next";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector, } from "react-redux"
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import LanguageSelector from "./LanguageSelector";

const TopBar = () => {
    const {t} = useTranslation();
    // const dispatch = useDispatch();
    // const {username, isLoggedIn, displayName, image} = useSelector(store => ({
    //     isLoggedIn: store.isLoggedIn,
    //     username: store.username,
    //     displayName: store.displayName,
    //     image: store.image
    // }));
    const [menuShow, setMenuShow] = useState(false);
    const menuArea = useRef(null);
    let userDesc = {
        username: username,
        displayName: displayName,
        image: image,
    }

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        }
    }, [isLoggedIn]);

    const menuClickTracker = (event) => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuShow(false);
        }
    }

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

   /*  let links = (
        <ul className={"navbar-nav ml-auto"}>
            <li>
                <NavLink className={"nav-link"} to={"/login"}>
                    {t("login")}
                </NavLink>
            </li>
            <li>
                <NavLink className={"nav-link"} to={"/singUp"}>
                    {t("singUp")}
                </NavLink>
            </li>
        </ul>
    ); */
/* 
    if (isLoggedIn) {
        links = (
            <ul className={"navbar-nav ml-auto"} ref={menuArea}>
                <li className={"nav-item dropdown d-flex"} onClick={() => setMenuShow(!menuShow)}>
                    <div>
                        {<ProfileImageWithDefault
                            className={"m-auto"}
                            user={userDesc}
                            style={{width: "32px", height: "32px", cursor: "pointer"}}/>}
                    </div>
                    <div>
                        <span className={"nav-link dropdown-toggle"} style={{cursor: "pointer"}}>
                             {displayName}
                        </span>
                        <div className={menuShow ? "dropdown-menu p-0 shadow show" : "dropdown-menu p-0 shadow"}
                             aria-labelledby={"navbarDropdown"}>
                            <NavLink className={"dropdown-item nav-link"} to={`/user/${username}`}>
                                {t("myProfile")}
                            </NavLink>
                            <span className={"dropdown-item nav-link"} onClick={onLogoutSuccess}
                                  style={{cursor: "pointer"}}>
                            {t("logout")}
                        </span>
                        </div>
                    </div>
                </li>
            </ul>
        );
    } */
    return (
        <div className={"shadow-sm bg-light mb-2"}>
            <nav className="navbar navbar-light navbar-expand container">
                <div className={"row"} style={{width: "100%"}}>
                    <div className={"col-10"}>
                        <NavLink className="navbar-brand" to={"/"}>
                            <img src={logo} width={60} alt={"HOAX Empty Project"} title={"HOAX Empty Project"}/>
                            Empty Project
                        </NavLink>
                    </div>
                    <div className={"col-1"}>
                        <LanguageSelector/>
                    </div>
                  {/*   <div className={"col-1"} style={{textAlign: "right"}}>
                        {links}
                    </div> */}
                </div>
            </nav>
        </div>
    );
}

export default TopBar;
