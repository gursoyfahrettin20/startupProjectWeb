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

const Index = () => {
    const propState = usePropState();
    const editor = useRef(null);
    const editorRead = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [newsList, setNewsList] = useState([]);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewNews, setIsNewNews] = useState(false);
    const [newsName, setNewsName] = useState("");
    const [routerLink, setRouterLink] = useState("");
    const [newImage, setNewImage] = useState();
    const [newsShortDetail, setNewsShortDetail] = useState("");
    const [newsDetail, setNewsDetail] = useState("");
    const navigate = useNavigate();

    const getNews = useCallback(async () => {
        const response = await listNews();
        setNewsList(response.data);
    }, []);

    useEffect(() => {
        getNews().then();
    }, []);

    const editHandler = (e, item) => {
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteNewsData(item.id).then()
        }
    }

    const editingHandler = (e, item) => {
        const newData = {
            name: !_.isEmpty(newsName) ? newsName : item.name,
            link: !_.isEmpty(routerLink) ? routerLink : item.link,
            image: !_.isEmpty(newImage) ? newImage : item.image,
            detail: !_.isEmpty(newsDetail) ? newsDetail : item.detail,
            shortDetail: !_.isEmpty(newsShortDetail) ? newsShortDetail : item.shortDetail
        }
        if (e.target.value === "save") {
            newData["id"] = item.id;
            updateNewsData(newData).then();
        } else if (e.target.value === "newItem") {
            newNewsData(newData).then();
        } else {
            setIsUpdateId(0);
            setIsNewNews(false);
        }
    }

    const newNewsData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await addNews(item, token);
            setIsNewNews(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewNews(false);
        }

    }, []);

    const updateNewsData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await updateNews(propState.id, item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteNewsData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await deleteNews(id, token);
            setIsNewNews(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
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

    const emptyForm = (<Row gutter={[12, 12]} justify="start">
        <Col className={"gutter-row"} span={18}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="newsName"
                        label={"Haber Adı"}
                        onChange={(e) => setNewsName(e.target.value)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="routerLink"
                        label={"Gideceği Sayfa Linki"}
                        onChange={(e) => setRouterLink(e.target.value)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="newsImage"
                        label={"Haber Resmi"}
                        onChange={onSelectImage}
                        type={"file"}
                        // errors={errors.image}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col className={"gutter-row"} span={6}>
                            Haber Kısa Açıklama
                        </Col>
                        <Col className={"gutter-row"} span={18}>
                            <JoditEditor ref={editor} value={newsShortDetail}
                                         onChange={(data) => setNewsShortDetail(data)}/>
                        </Col>
                    </Row>
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col className={"gutter-row"} span={6}>
                            Haber Detay
                        </Col>
                        <Col className={"gutter-row"} span={18}>
                            <JoditEditor ref={editor} value={newsDetail}
                                         onChange={(data) => setNewsDetail(data)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
            <Radio.Group onChange={(e) => {
                editingHandler(e)
            }}>
                <Radio.Button className={"save"} value="newItem">Kaydet</Radio.Button>
                <Radio.Button className={"cancel"} value="cancel"
                              danger>İptal</Radio.Button>
            </Radio.Group>
        </Col>
    </Row>);

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>Haber Ekleme Sayfası</div>
            <div className={"card-body"}>
                <Button className={"success"} title={"Yeni Haber Ekle"} icon={<PlusOutlined/>}
                        onClick={newNews}>
                    Yeni Haber Ekle
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
                                        label={"Haber Adı"}
                                        defaultValue={item.name}
                                        // errors={errors.branchName}
                                        onChange={(e) => setNewsName(e.target.value)}
                                    />
                                </Col>
                            </Row>) : <>
                                <label className='form-label' htmlFor={item.name + "_description"}> Haber Adı
                                    : </label> <span>{item.name}</span>
                            </>
                            }
                            description={
                                <Row gutter={[12, 12]} justify="start">
                                    <Col className={"gutter-row"} span={18}>
                                        {isUpdateId === item.id ? (<FormItem
                                            name="routerLink"
                                            label={"Gideceği Sayfa Linki"}
                                            defaultValue={item.link}
                                            onChange={(e) => setRouterLink(e.target.value)}
                                        />) : <>
                                            <label className='form-label' htmlFor={item.link + "_description"}> Gideceği
                                                Sayfa Linki
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
                                                                label={"Haber Resmi"}
                                                                onChange={onSelectImage}
                                                                type={"file"}
                                                                // errors={errors.image}
                                                            />
                                                        </Col>
                                                    ) : <>
                                                        <Col className={"gutter-row"} span={6}>
                                                            <label className='form-label'
                                                                   htmlFor={item.name + "_description"}>Haber
                                                                Resmi ;</label>
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
                                                        Haber Kısa Açıklama
                                                    </Col>
                                                    <Col className={"gutter-row"} span={18}>
                                                        {isUpdateId === item.id ? (
                                                            <JoditEditor ref={editor} value={item.shortDetail}
                                                                         onChange={(data) => setNewsShortDetail(data)}/>
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
                                                        Haber Detay
                                                    </Col>
                                                    <Col className={"gutter-row"} span={18}>
                                                        {isUpdateId === item.id ? (
                                                            <JoditEditor ref={editor} value={item.detail}
                                                                         onChange={(data) => setNewsDetail(data)}/>
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
                                            <Radio.Button className={"save"} value="save">Kaydet</Radio.Button>
                                            <Radio.Button className={"cancel"} value="cancel"
                                                          danger>İptal</Radio.Button>
                                        </Radio.Group>) : (<Radio.Group onChange={(e) => {
                                            editHandler(e, item)
                                        }}>
                                            <Radio.Button className={"update"} value={"update"}>Düzenle</Radio.Button>
                                            <Radio.Button className={"delete"} value={"delete"}
                                                          danger>Sil</Radio.Button>
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