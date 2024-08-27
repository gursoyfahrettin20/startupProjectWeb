import React, {useCallback, useEffect, useRef, useState} from 'react';
import {usePropState} from "@/shared/context.jsx";
import {useNavigate} from "react-router-dom";
import {addNews, deleteNews, listNews, updateNews,} from "@/api/apiCalls.js";
import {Button, Col, List, Radio, Row} from "antd";
import FormItem from "@/components/formItem/FormItem.jsx";
import {PlusOutlined} from "@ant-design/icons";
import JoditEditor from 'jodit-react';
import NewsImage from "@/components/Image/NewsImage.jsx";
import ReadEditor from "@/components/editor/ReadEditor.jsx";
import _ from "lodash";
import {VALIDATION} from "@/shared/validate/Validation.js";
import {isValidCheck} from "@/shared/validate/IsValidCheck.js";
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation();
    const propState = usePropState();
    const editor = useRef(null);
    const editorRead = useRef(null);
    const [newsList, setNewsList] = useState([]);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewNews, setIsNewNews] = useState(false);
    const [newsName, setNewsName] = useState("");
    const [routerLink, setRouterLink] = useState("");
    const [newImage, setNewImage] = useState();
    const [newsShortDetail, setNewsShortDetail] = useState("");
    const [newsDetail, setNewsDetail] = useState("");
    const navigate = useNavigate();
    const [validation, setValidation] = useState({
        newsName: true
    });
    const [validPage, setValidPage] = useState(false);
    const [lang, setLang] = useState(localStorage.lang);

    useEffect(() => {
        setValidPage(!isValidCheck(validation));
    }, [validation]);

    const getNews = useCallback(async () => {
        const response = await listNews();
        let langForList = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].language === localStorage.lang) {
                langForList.push(response.data[i]);
            }
        }
        setNewsList(langForList);
        setLang(localStorage.lang);
    }, []);

    useEffect(() => {
        getNews().then();
    }, []);

    useEffect(() => {
        if (!_.isEqual(lang, localStorage.lang)) {
            navigate(0);
        }
    }, [localStorage.lang]);

    const editHandler = (e, item) => {
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteNewsData(item.id).then()
        }
    }
    const newNewsHandler = (e, item) => {
        if (e.target.value !== "cancel") {
            const newData = {
                name: newsName,
                link: routerLink,
                image: newImage,
                detail: newsDetail,
                shortDetail: newsShortDetail,
                language: localStorage.lang
            }

            newNewsData(newData).then();
        } else {
            setIsNewNews(false);
            setValidation({
                newsName: true
            });
        }
    }

    const editingHandler = (e, item) => {
        const newData = {
            name: !_.isEmpty(newsName) ? newsName : item.name,
            link: !_.isEmpty(routerLink) ? routerLink : item.link,
            image: !_.isEmpty(newImage) ? newImage : item.image,
            detail: !_.isEmpty(newsDetail) ? newsDetail : item.detail,
            shortDetail: !_.isEmpty(newsShortDetail) ? newsShortDetail : item.shortDetail,
            language: localStorage.lang
        }
        if (e.target.value === "save") {
            newData["id"] = item.id;
            updateNewsData(newData).then();
        } else {
            setIsUpdateId(0);
            setIsNewNews(false);
        }
    }

    const newNewsData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await addNews(item, token);
            setIsNewNews(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewNews(false);
        }

    }, []);

    const updateNewsData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await updateNews(propState.id, item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteNewsData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await deleteNews(id, token);
            setIsNewNews(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewNews(false);
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
            setNewImage(data);
        }
        fileReader.readAsDataURL(file);
    }

    const newNews = () => {
        setIsNewNews(true);
        setNewsName({})
    }

    const onHandlerNewsName = (e) => {
        const isValidNewsName = VALIDATION.NEWS[e.target.name].test(e.target.value);
        if (isValidNewsName) {
            setNewsName(e.target.value);
        }
        setValidation({
            newsName: isValidNewsName
        });
    }

    const emptyForm = (<Row gutter={[12, 12]} justify="start">
        <Col className={"gutter-row"} span={18}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="newsName"
                        label={t("news.newsName")}
                        errors={t("validation.news.newsName")}
                        validation={validation}
                        onChange={(e) => onHandlerNewsName(e)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="routerLink"
                        label={t("news.link")}
                        onChange={(e) => setRouterLink(e.target.value)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="newsImage"
                        label={t("news.newsImage")}
                        onChange={onSelectImage}
                        type={"file"}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col className={"gutter-row"} span={6}>
                            {t("news.newsShortDescription")}
                        </Col>
                        <Col className={"gutter-row"} span={18}>
                            <JoditEditor config={{language: localStorage.lang}} ref={editor} value={newsShortDetail}
                                         onBlur={(data) => setNewsShortDetail(data)}/>
                        </Col>
                    </Row>
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col className={"gutter-row"} span={6}>
                            {t("news.newsDetailDescription")}
                        </Col>
                        <Col className={"gutter-row"} span={18}>
                            <JoditEditor config={{language: localStorage.lang}} ref={editor} value={newsDetail}
                                         onBlur={(data) => setNewsDetail(data)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
            <Radio.Group onChange={(e) => {
                newNewsHandler(e)
            }}>
                <Radio.Button className={"save"} value="newItem" disabled={!validPage}>{t("save")}</Radio.Button>
                <Radio.Button className={"cancel"} value="cancel"
                              danger>{t("cancel")}</Radio.Button>
            </Radio.Group>
        </Col>
    </Row>);

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>{t("news.newsAddPage")}</div>
            <div className={"card-body"}>
                <Button className={"success"} title={t("news.newsAdd")} icon={<PlusOutlined/>}
                        onClick={newNews}>
                    {t("news.newsAdd")}
                </Button>
            </div>
            <div className={"newsList card-body"}>
                {isNewNews && (emptyForm)}
                <List
                    itemLayout="horizontal"
                    dataSource={newsList}
                    renderItem={(item) => (<List.Item>
                        <List.Item.Meta
                            title={isUpdateId === item.id ? (<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <FormItem
                                        name="newsName"
                                        label={t("news.newsName")}
                                        defaultValue={item.name}
                                        errors={t("validation.news.newsName")}
                                        validation={validation}
                                        onChange={(e) => setNewsName(e.target.value)}
                                    />
                                </Col>
                            </Row>) : <>
                                <label className='form-label' htmlFor={item.name + "_description"}> {t("news.newsName")}
                                    : </label> <span>{item.name}</span>
                            </>
                            }
                            description={
                                <Row gutter={[12, 12]} justify="start">
                                    <Col className={"gutter-row"} span={18}>
                                        {isUpdateId === item.id ? (<FormItem
                                            name="routerLink"
                                            label={t("news.link")}
                                            defaultValue={item.link}
                                            onChange={(e) => setRouterLink(e.target.value)}
                                        />) : <>
                                            <label className='form-label'
                                                   htmlFor={item.link + "_description"}>{t("news.link")}
                                                : </label> <span>{item.link}</span>
                                        </>
                                        }
                                    </Col>
                                    <Col className={"gutter-row"} span={18}>
                                        <Row gutter={[12, 12]} justify="start">
                                            <Col className={"gutter-row"} span={24}>
                                                <Row gutter={[12, 12]} justify="start">
                                                    {isUpdateId === item.id ? (
                                                        <Col className={"gutter-row"} span={24}>
                                                            <FormItem
                                                                name="newsImage"
                                                                label={t("news.newsImage")}
                                                                onChange={onSelectImage}
                                                                type={"file"}
                                                            />
                                                        </Col>
                                                    ) : <>
                                                        <Col className={"gutter-row"} span={6}>
                                                            <label className='form-label'
                                                                   htmlFor={item.name + "_description"}>  {t("news.newsImage")} ;</label>
                                                        </Col>
                                                        <Col className={"gutter-row"} span={18}
                                                             style={{textAlign: "center"}}>
                                                            <NewsImage image={item.image} style={{
                                                                maxWidth: "100%",
                                                                margin: "20px"
                                                            }}/>
                                                        </Col>
                                                    </>
                                                    }
                                                </Row>
                                            </Col>
                                            <Col className={"gutter-row"} span={24}>
                                                <Row gutter={[12, 12]} justify="start">
                                                    <Col className={"gutter-row"} span={6}>
                                                        {t("news.newsShortDescription")}
                                                    </Col>
                                                    <Col className={"gutter-row"} span={18}>
                                                        {isUpdateId === item.id ? (
                                                            <JoditEditor config={{language: localStorage.lang}} ref={editor} value={item.shortDetail}
                                                                         onBlur={(data) => setNewsShortDetail(data)}/>
                                                        ) : <>
                                                            <ReadEditor
                                                                ref={editorRead}
                                                                value={item.shortDetail}
                                                                disable={true}
                                                            />
                                                        </>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className={"gutter-row"} span={24}>
                                                <Row gutter={[12, 12]} justify="start">
                                                    <Col className={"gutter-row"} span={6}>
                                                        {t("news.newsDetailDescription")}
                                                    </Col>
                                                    <Col className={"gutter-row"} span={18}>
                                                        {isUpdateId === item.id ? (
                                                            <JoditEditor config={{language: localStorage.lang}} ref={editor} value={item.detail}
                                                                         onBlur={(data) => setNewsDetail(data)}/>
                                                        ) : <>
                                                            <ReadEditor
                                                                ref={editorRead}
                                                                value={item.detail}
                                                                disable={true}
                                                            />
                                                        </>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className={"gutter-row custom-radio-btn"} span={6}
                                         style={{textAlign: "right"}}>
                                        {isUpdateId === item.id ? (<Radio.Group onChange={(e) => {
                                            editingHandler(e, item)
                                        }}>
                                            <Radio.Button className={"save"} value="save"
                                                          disabled={!validPage}>{t("update")}</Radio.Button>
                                            <Radio.Button className={"cancel"} value="cancel"
                                                          danger>{t("cancel")}</Radio.Button>
                                        </Radio.Group>) : (<Radio.Group onChange={(e) => {
                                            editHandler(e, item)
                                        }}>
                                            <Radio.Button className={"update"} value={"update"}
                                                          disabled={isNewNews}>{t("edit")}</Radio.Button>
                                            <Radio.Button className={"delete"} value={"delete"} disabled={isNewNews}
                                                          danger>{t("delete")}</Radio.Button>
                                        </Radio.Group>)}
                                    </Col>
                                </Row>}
                        />
                    </List.Item>)}
                />
            </div>
        </div>
    );
};

export default Index;