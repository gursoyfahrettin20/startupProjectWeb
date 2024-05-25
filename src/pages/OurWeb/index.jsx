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

    const getContact = useCallback(async (id) => {
        const response = await loadOurWeb();
        let _id = _.findIndex(response.data, function (o) {
            return o.id === id;
        })
        setContent(response.data[_id].detail);
    }, []);

    useEffect(() => {
        getContact(props.id).then(props.id);
    }, []);

    const saveHandler = (buttonName) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        if (buttonName === "save") {
            let _content = {
                id: props.id,
                detail: content
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

    return (<div className={"card"}>
        <div className={"card-header text-center fs-4"}>{t("ourPage." + props.elementName)}</div>
        <div className={"card-body"}>
            <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)}/>
        </div>
        <div className={"card-footer text-end"}>
            <Radio.Group onChange={(e) => saveHandler(e.target.value)}>
                <Radio.Button value="clear">{t("clear")}</Radio.Button>
                <Radio.Button value="save">{t("save")}</Radio.Button>
            </Radio.Group>
        </div>
    </div>);
}

export default Index;