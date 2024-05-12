import React, {useCallback, useEffect, useRef, useState} from 'react';
import {usePropState} from "@/shared/context.jsx";
import {useNavigate} from "react-router-dom";
import {addCategories, deleteCategory, loadCategory, updateCategory} from "@/api/apiCalls.js";
import {Button, Col, List, Radio, Row} from "antd";
import FormItem from "@/components/formItem/FormItem.jsx";
import {PlusOutlined} from "@ant-design/icons";
import JoditEditor from 'jodit-react';
import CategoryImage from "@/components/Image/CategoryImage.jsx";
import ReadEditor from "@/components/editor/ReadEditor.jsx";
import _ from "lodash";

const Categories = () => {
    const propState = usePropState();
    const editor = useRef(null);
    const editorRead = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [categoryName, setCategoryName] = useState({});
    const [newImage, setNewImage] = useState();
    const [categoryDetail, setCategoryDetail] = useState("");
    const navigate = useNavigate();

    const getCategory = useCallback(async () => {
        const response = await loadCategory();
        setCategoryList(response.data);
    }, []);

    useEffect(() => {
        getCategory().then();
    }, []);

    const editHandler = (e, item) => {
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteCategoryData(item.id).then()
        }
    }

    const editingHandler = (e, item) => {
        const newData = {
            name: !_.isEmpty(categoryName) ? categoryName : item.name,
            image: !_.isEmpty(newImage) ? newImage : item.image,
            detail: !_.isEmpty(categoryDetail) ? categoryDetail : item.detail
        }
        if (e.target.value === "save") {
            newData["id"] = item.id;
            updateCategoryData(newData).then();
        } else if (e.target.value === "newItem") {
            newCategoryData(newData).then();
        } else {
            setIsUpdateId(0);
            setIsNewCategory(false);
        }
    }

    const newCategoryData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await addCategories(item, token);
            setIsNewCategory(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewCategory(false);
        }

    }, []);

    const updateCategoryData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await updateCategory(item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteCategoryData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await deleteCategory(id, token);
            setIsNewCategory(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
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
        setCategoryName({})
    }

    const emptyForm = (<Row gutter={[12, 12]} justify="start">
        <Col className={"gutter-row"} span={18}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="categoryName"
                        label={"Kategori Adı"}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="categoryImage"
                        label={"Kategori Resmi"}
                        onChange={onSelectImage}
                        type={"file"}
                        // errors={errors.image}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <JoditEditor ref={editor} value={categoryDetail}
                                 onChange={(data) => setCategoryDetail(data)}/>
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
            <div className={"card-header text-center fs-4"}>Kategori Ekleme Sayfası</div>
            <div className={"card-body"}>
                <Button className={"success"} title={"Yeni Kategori Ekle"} icon={<PlusOutlined/>}
                        onClick={newCategory}>
                    Yeni Kategori Ekle
                </Button>
            </div>
            <div className={"categoryList card-body"}>
                {isNewCategory && (emptyForm)}
                <List
                    itemLayout="horizontal"
                    dataSource={categoryList}
                    renderItem={(item) => (<List.Item>
                        <List.Item.Meta
                            title={isUpdateId === item.id ? (<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <FormItem
                                        name="categoryName"
                                        label={"Kategori Adı"}
                                        defaultValue={item.name}
                                        // errors={errors.branchName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </Col>
                            </Row>) : <>
                                <label className='form-label' htmlFor={item.name + "_description"}> Kategori Adı
                                    : </label> <span>{item.name}</span>
                            </>
                            }
                            description={
                                <Row gutter={[12, 12]} justify="start">
                                    <Col className={"gutter-row"} span={18}>
                                        <Row gutter={[12, 12]} justify="start">
                                            <Col className={"gutter-row"} span={24}>
                                                {isUpdateId === item.id ? (<FormItem
                                                    name="categoryImage"
                                                    label={"Kategori Resmi"}
                                                    onChange={onSelectImage}
                                                    type={"file"}
                                                    // errors={errors.image}
                                                />) : <>
                                                    <label className='form-label' htmlFor={item.name + "_description"}>Kategori
                                                        Resmi ;</label>
                                                    <CategoryImage image={item.image} style={{maxWidth:"150px", maxHeight:"150px", margin:"20px"}}/>
                                                </>}
                                            </Col>
                                            <Col className={"gutter-row"} span={24}>
                                                {isUpdateId === item.id ? (
                                                    <JoditEditor ref={editor} value={item.detail}
                                                                 onChange={(data) => setCategoryDetail(data)}/>
                                                ) : <>
                                                    <label className='form-label' htmlFor={item.name + "_description"}>Kategori
                                                        Açıklaması ;</label>
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

export default Categories;