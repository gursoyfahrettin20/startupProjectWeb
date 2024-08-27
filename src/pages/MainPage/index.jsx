import React, {useCallback, useEffect, useRef, useState} from 'react';
import JoditEditor from 'jodit-react';
import {loadOurWeb, updateOurWeb} from "@/api/apiCalls.js";
import {usePropState} from "@/shared/context.jsx";
import {Col, Radio, Row} from 'antd';
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import FormItem from "@/components/formItem/FormItem.jsx";
import PageImage from "@/components/Image/PageImage.jsx";
import {useTranslation} from "react-i18next";

function Index(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [lang, setLang] = useState(localStorage.lang);

    const getContact = useCallback(async (id) => {
        const response = await loadOurWeb();
        let _id = _.findIndex(response.data, function (o) {
            return o.id === id;
        })
        setContent(response.data[_id].detail);
        setName(response.data[_id].name);
        setImage(response.data[_id].image);
        setLang(localStorage.lang)
    }, []);

    useEffect(() => {
        getContact(props.id).then(props.id);
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
                image: image,
                name: props.elementName,
                language: localStorage.lang
            }
            updateOurWebData(propState.id, _content, token).then();
        } else if (buttonName === "clear") {
            setContent("");
            setImage();
        }
    }

    const updateOurWebData = useCallback(async (id, item, ourId) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await updateOurWeb(id, item, ourId, token);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {

        }
    }, []);

    const onSelectImage = (event) => {
        if (event.target.files < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const data = fileReader.result;
            setImage(data);
        }
        fileReader.readAsDataURL(file);
    }


    return (<div className={"card"}>
        <div className={"card-header text-center fs-4"}>{t("ourPage." + props.elementName)}</div>
        <div className={"card-body"}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="MainImage"
                        label={t("uploadImage")}
                        onChange={onSelectImage}
                        type={"file"}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <label className='form-label' htmlFor={name + "_description"}>
                        {t("uploadedImage")} :
                    </label>
                    <PageImage image={image} style={{maxWidth: "150px", maxHeight: "150px", margin: "20px"}}/>
                </Col>
            </Row>
            <JoditEditor config={{language: localStorage.lang}} ref={editor} value={content} onBlur={(newContent) => setContent(newContent)}/>
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