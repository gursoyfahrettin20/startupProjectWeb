import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    addReferencesCategories,
    deleteReferencesCategory,
    loadReferencesCategory,
    updateReferencesCategory
} from "@/api/apiCalls.js";
import {Button, Col, List, Radio, Row} from "antd";
import FormItem from "@/components/formItem/FormItem.jsx";
import {PlusOutlined} from "@ant-design/icons";
import JoditEditor from 'jodit-react';
import ReferencesCategoryImage from "@/components/Image/ReferencesCategoryImage.jsx";
import ReadEditor from "@/components/editor/ReadEditor.jsx";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {VALIDATION} from "@/shared/validate/Validation.js";
import {isValidCheck, turkishCharactersToEnglishCharacters} from "@/shared/validate/IsValidCheck.js";

const Categories = () => {
    const {t} = useTranslation();
    const editor = useRef(null);
    const editorRead = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [categoryName, setCategoryName] = useState(null);
    const [categoryUrl, setCategoryUrl] = useState(null);
    const [newImage, setNewImage] = useState();
    const [categoryDetail, setCategoryDetail] = useState("");
    const navigate = useNavigate();
    const [validation, setValidation] = useState({
        categoryName: true,
        categoryUrl: true,
    });
    const [validPage, setValidPage] = useState(false);
    const [lang, setLang] = useState(localStorage.lang);

    useEffect(() => {
        setValidPage(!isValidCheck(validation));
    }, [validation]);

    const getCategory = useCallback(async () => {
        const response = await loadReferencesCategory();
        let langForList = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].language === localStorage.lang) {
                langForList.push(response.data[i]);
            }
        }
        setCategoryList(langForList);
    }, []);

    useEffect(() => {
        getCategory().then();
    }, []);

    useEffect(() => {
        if (!_.isEqual(lang, localStorage.lang)) {
            navigate(0);
        }
    }, [localStorage.lang]);

    const editHandler = (e, item) => {
        setValidation({
            categoryName: true,
            categoryUrl: true,
        });
        setIsUpdateId(0);
        setNewImage();
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteCategoryData(item.id).then()
        }
    }

    const newCreateHandler = (e) => {
        if (e.target.value !== "cancel") {
            const newData = {
                name: categoryName,
                url: categoryUrl,
                image: newImage,
                detail: categoryDetail,
                language: localStorage.lang
            }
            newCategoryData(newData).then();
        } else {
            setIsNewCategory(false);
            setValidation({
                categoryName: true
            });
        }
    }

    const editingHandler = (e, item) => {
        const newData = {
            name: !_.isEmpty(categoryName) ? categoryName : item.name,
            url: !_.isEmpty(categoryUrl) ? categoryUrl : item.url,
            image: !_.isEmpty(newImage) ? newImage : item.image,
            detail: !_.isEmpty(categoryDetail) ? categoryDetail : item.detail,
            language: localStorage.lang
        }
        if (e.target.value === "save") {
            newData["id"] = item.id;
            updateCategoryData(newData).then();
        } else {
            setCategoryName(null)
            setCategoryUrl(null)
            setIsUpdateId(0);
            setIsNewCategory(false);
            setNewImage();
        }
    }

    const newCategoryData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await addReferencesCategories(item, token);
            setIsNewCategory(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewCategory(false);
        }

    }, []);

    const updateCategoryData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await updateReferencesCategory(item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteCategoryData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await deleteReferencesCategory(id, token);
            setIsNewCategory(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewCategory(false);
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

    const newCategory = () => {
        setIsNewCategory(true);
        setCategoryName(null);
        setCategoryUrl(null);
        setIsUpdateId(0);
        setNewImage();
    }

    const onHandlerCategoryName = (e) => {
        let _turkishCharactersToEnglishCharacters = turkishCharactersToEnglishCharacters(e.target.value);
        const isValidCategoryName = VALIDATION.PRODUCT_CATEGORY[e.target.name].test(e.target.value);
        if (isValidCategoryName) {
            setCategoryName(e.target.value);
            setCategoryUrl(_turkishCharactersToEnglishCharacters.replace(/\s/g, ''));
        }
        setValidation({
            categoryName: isValidCategoryName,
            categoryUrl: true
        });
    }

    const onHandlerCategoryUrl = (e) => {
        let _turkishCharactersToEnglishCharacters = turkishCharactersToEnglishCharacters(e.target.value);
        const isValidCategoryUrl = VALIDATION.PRODUCT_CATEGORY[e.target.name].test(_turkishCharactersToEnglishCharacters);
        if (isValidCategoryUrl) {
            setCategoryUrl(_turkishCharactersToEnglishCharacters.replace(/\s/g, ''));
        }
        setValidation({
            categoryUrl: isValidCategoryUrl
        });
    }


    const emptyForm = (<Row gutter={[12, 12]} justify="start">
        <Col className={"gutter-row"} span={18}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="categoryName"
                        label={t("productCategory.categoryName")}
                        errors={t("validation.productCategory.categoryName")}
                        validation={validation}
                        onChange={(e) => onHandlerCategoryName(e)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="categoryUrl"
                        label={t("url")}
                        errors={t("validation.productCategory.categoryUrl")}
                        validation={validation}
                        onChange={(e) => onHandlerCategoryUrl(e)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="categoryImage"
                        label={"Kategori Resmi"}
                        onChange={onSelectImage}
                        type={"file"}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <JoditEditor config={{language: localStorage.lang}} ref={editor} value={categoryDetail}
                                 onBlur={(data) => setCategoryDetail(data)}/>
                </Col>
            </Row>
        </Col>
        <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
            <Radio.Group onChange={(e) => newCreateHandler(e)}>
                <Radio.Button className={"save"} value="newItem" disabled={!validPage}>{t("save")}</Radio.Button>
                <Radio.Button className={"cancel"} value="cancel" danger>{t("cancel")}</Radio.Button>
            </Radio.Group>
        </Col>
    </Row>);

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>{t("referencesCategory.referencesAddPage")}</div>
            <div className={"card-body"}>
                <Button className={"success"} title={t("referencesCategory.categoryAdd")} icon={<PlusOutlined/>}
                        onClick={newCategory}>
                    {t("referencesCategory.categoryAdd")}
                </Button>
            </div>
            <div className={"categoryList card-body"}>
                {isNewCategory && (emptyForm)}
                <List
                    itemLayout="horizontal"
                    dataSource={categoryList}
                    renderItem={(item) => (
                        <List.Item>
                        <List.Item.Meta
                            title={isUpdateId === item.id ? (
                                <Row gutter={[12, 12]} justify="start">
                                    <Col className={"gutter-row"} span={18}>
                                        <FormItem
                                            name="categoryName"
                                            label={t("referencesCategory.categoryName")}
                                            errors={t("validation.referencesCategory.categoryName")}
                                            validation={validation}
                                            defaultValue={categoryName || item.name}
                                            onChange={(e) => onHandlerCategoryName(e)}
                                        />
                                    </Col>
                                    <Col className={"gutter-row"} span={18}>
                                        <FormItem
                                            name="categoryUrl"
                                            label={t("url")}
                                            errors={t("validation.referencesCategory.categoryUrl")}
                                            validation={validation}
                                            defaultValue={categoryUrl || item.url}
                                            onChange={(e) => onHandlerCategoryUrl(e)}
                                        />
                                    </Col>
                                </Row>
                            ) : <>
                                <label className='form-label' htmlFor={item.name + "_description"}>
                                    Kategori Adı :
                                </label>
                                <span>{item.name}</span>
                            </>
                            }
                            description={
                                <Row gutter={[12, 12]} justify="start">
                                    <Col className={"gutter-row"} span={18}>
                                        <Row gutter={[12, 12]} justify="start">
                                            <Col className={"gutter-row"} span={24}>
                                                {isUpdateId === item.id ? (<FormItem
                                                    name="categoryImage"
                                                    label={t("referencesCategory.categoryImage")}
                                                    onChange={onSelectImage}
                                                    type={"file"}
                                                />) : <>
                                                    <label className='form-label' htmlFor={item.name + "_description"}>Kategori
                                                        Resmi ;</label>
                                                    <ReferencesCategoryImage image={item.image} style={{maxWidth:"150px", maxHeight:"150px", margin:"20px"}}/>
                                                </>}
                                            </Col>
                                            <Col className={"gutter-row"} span={24}>
                                                {isUpdateId === item.id ? (
                                                    <JoditEditor config={{language: localStorage.lang}} ref={editor} value={item.detail}
                                                                 onBlur={(data) => setCategoryDetail(data)}/>
                                                ) : <>
                                                    <label className='form-label'
                                                           htmlFor={item.name + "_description"}>{t("referencesCategory.categoryDesc")} ;</label>
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
                                                          disabled={isNewCategory || isUpdateId !== 0}>{t("edit")}</Radio.Button>
                                            <Radio.Button className={"delete"} value={"delete"} danger
                                                          disabled={isNewCategory || isUpdateId !== 0}>{t("delete")}</Radio.Button>
                                        </Radio.Group>)}
                                    </Col>
                                </Row>}
                        />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default Categories;