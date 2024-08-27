import React, {useCallback, useEffect, useRef, useState} from 'react';
import JoditEditor from 'jodit-react';
import {loadOurWeb, updateOurWeb} from "@/api/apiCalls.js";
import {usePropState} from "@/shared/context.jsx";
import {Radio} from 'antd';
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import {useTranslation} from "react-i18next";

function Index(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.lang);

    const getContact = useCallback(async (id) => {
        const response = await loadOurWeb();
        let _id = _.findIndex(response.data, function (o) {
            return o.id === id;
        })
        setContent(response.data[_id].detail);
        setLang(localStorage.lang)
    }, []);

    useEffect(() => {
        getContact(props.id).then();
    }, []);

    useEffect(() => {
        if (!_.isEqual(lang, localStorage.lang)) {
            navigate(0);
        }
    }, [localStorage.lang]);

    const saveHandler = (buttonName) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        if (buttonName === "save") {
            let _content = {
                id: props.id,
                detail: content,
                language: localStorage.lang
            }
            updateOurWebData(propState.id, _content, token).then();
        } else if (buttonName === "clear") {
            setContent("");
        }
    }

    const updateOurWebData = useCallback(async (id, item, ourId) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await updateOurWeb(id, item, ourId, token);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }, []);

    const conf = (
        {
            style: {border: "2px solid #ccc", paddingTop: "10px", paddingLeft: "10px"},
            toolbar: false,
            showXPathInStatusbar: false,
            language: localStorage.lang,
            inline: true,
            placeholder: t("ourPage.socialUrlLink")
        }
    )

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>{t("ourPage." + props.elementName)}</div>
            {
                props.id > 14 && propState.id < 25 ?
                    <div className={"card-body"}>
                        <JoditEditor config={conf} ref={editor} value={content}
                                     onBlur={(newContent) => setContent(newContent)}/>
                    </div>
                    :
                    <div className={"card-body"}>
                        <JoditEditor config={{language: localStorage.lang}} ref={editor} value={content}
                                     onBlur={(newContent) => setContent(newContent)}/>
                    </div>
            }


            <div className={"card-footer text-end"}>
                <Radio.Group onChange={(e) => saveHandler(e.target.value)}>
                    <Radio.Button value="clear">{t("clear")}</Radio.Button>
                    <Radio.Button value="save">{t("save")}</Radio.Button>
            </Radio.Group>
        </div>
        </div>
    );
}

export default Index;