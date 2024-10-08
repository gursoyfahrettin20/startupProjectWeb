import { changeLanguage } from "@/api/apiCalls";
import { useTranslation } from "react-i18next";
import trFlag from "@/assets/tr.png"
import enFlag from "@/assets/en.png"
import {useEffect} from "react";

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        if (!localStorage.getItem("lang")) {
            localStorage.setItem("lang", "tr");
        }
    }, []);

    const onChangeLanguage = lang => {
        i18n.changeLanguage(lang).then();
        localStorage.setItem("lang", lang)
        changeLanguage(lang);
    }

    return (
        <div className={"lang"}>
            <ul>
                <li>
                    <span style={{ cursor: "pointer", width: "35px", height: 25 }} onClick={() => onChangeLanguage("tr")} title={"TR"}>
                        <img src={trFlag} title="Türkçe" alt="Türkçe Dili" />
                    </span>
                </li>
                <li>
                    <span style={{ cursor: "pointer", width: "35px", height: 25 }} onClick={() => onChangeLanguage("en")} title={"EN"}>
                        <img src={enFlag} title="English" alt="English Language" />
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default LanguageSelector;
