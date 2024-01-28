import React from "react";
import {changeLanguage} from "../../api/apiCalls";
import {useTranslation} from "react-i18next";

const LanguageSelector = () => {
    const {i18n} = useTranslation();

    const onChangeLanguage = lang => {
        i18n.changeLanguage(lang).then();
        changeLanguage(lang);
    }

    return (
        <div className={"lang"}>
            <ul>
                <li>
                    <span style={{cursor: "pointer"}} onClick={() => onChangeLanguage("tr")} title={"TR"}>
                        TR
                    </span>
                </li>
                <li>
                    <span style={{cursor: "pointer"}} onClick={() => onChangeLanguage("en")} title={"EN"}>
                        EN
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default LanguageSelector;
