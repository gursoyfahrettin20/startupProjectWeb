import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    addProduct,
    addProductImage,
    deleteImage,
    deleteProduct,
    listProductImage,
    loadCategory,
    loadProduct,
    updateProduct
} from "@/api/apiCalls.js";
import {Button, Col, Image, List, Radio, Row, Upload} from "antd";
import FormItem from "@/components/formItem/FormItem.jsx";
import {PlusOutlined} from "@ant-design/icons";
import CustomSelect from "@/components/customSelect/CustomSelect.jsx";
import _ from "lodash";
import './index.scss';
import ReadEditor from "@/components/editor/ReadEditor.jsx";
import EditingEditor from "@/components/editor/EditingEditor.jsx";
import {useTranslation} from "react-i18next";
import {VALIDATION} from "@/shared/validate/Validation.js";
import {isValidCheck} from "@/shared/validate/IsValidCheck.js";

function Index(props) {
    const {t} = useTranslation();
    const editor = useRef(null);
    const editorRead = useRef(null);
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [productName, setProductName] = useState(null);
    const [newImage, setNewImage] = useState([]);
    const [productDetail, setProductDetail] = useState("");
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [page, setPage] = useState({});
    const [imgList, setImgList] = useState([]);
    const navigate = useNavigate();
    const [validation, setValidation] = useState({
        selectCategory: true,
        productName: true,
    });
    const [validPage, setValidPage] = useState(false);

    useEffect(() => {
        setValidPage(!isValidCheck(validation));
    }, [validation]);


    useEffect(() => {
        getCategory().then();
        getProducts().then();
    }, []);

    useEffect(() => {
        let img = [];
        if (!_.isEmpty(imgList)) {
            for (let i = 0; i < imgList.length; i++) {
                if (imgList.length > 0) {
                    img.push({
                        id: imgList[i].id,
                        name: imgList[i].image,
                        status: 'done',
                        url: "/assets/product/" + imgList[i].image,
                    })
                }
            }
            setFileList(img);
        }
    }, [imgList]);

    useEffect(() => {
        let options = [];
        if (categoryList.length > 0) {
            for (let i = 0; i < categoryList.length; i++) {
                options.push({
                    value: categoryList[i].id, label: categoryList[i].name,
                })
            }
            setCategoryOptions(options);
        }
    }, [categoryList]);

    const editHandler = (e, item) => {
        if (e.target.value === "edit") {
            setIsUpdateId(item.id);
            getImgList(item.id).then();
        } else {
            deleteProductData(item.id).then()
        }
    }

    const newCreateHandler = (e) => {
        if(e.target.value !=="cancel"){
            const newData = {
                name: productName, detail: productDetail
            }
            const indexCategory = _.findIndex(categoryList, (data) => {
                return data.id === selectedCategory;
            })
            newData["categories"] = categoryList[indexCategory];
            newProductData(newData).then();
            navigate(0);
        } else {
            setIsNewProduct(false);
        }
    }

    const editingHandler = (e, item) => {
        if (e.target.value === "save") {
            const index = _.findIndex(productList, (data) => {
                return data.id === item.id;
            })
            for (let i = 0; i < newImage.length; i++) {
                newImage[i]["products"] = productList[index];
            }
            newProductImageData(newImage).then();
            const newData = {
                id: productList[index].id,
                name: !_.isEmpty(productName) ? productName : productList[index].name,
                detail: !_.isEmpty(productDetail) ? productDetail : productList[index].detail
            }
            updateProductData(newData).then();
            navigate(0);
        } else {
            setIsUpdateId(0);
            setIsNewProduct(false);
        }
    }

    const getImgList = useCallback(async (productId) => {
        try {
            const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
            const list = await listProductImage(productId, token);
            setImgList(list.data);
        } catch (error) {
        }
    }, []);

    const getCategory = useCallback(async () => {
        try {
            const responseCategory = await loadCategory();
            setCategoryList(responseCategory.data);
        } catch (error) {
        }
    }, []);

    const getProducts = useCallback(async (page) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const responseProduct = await loadProduct(page, 5, token);
            setProductList(responseProduct.data.content);
            setPage({...responseProduct.data});
        } catch (error) {
        }
    }, []);

    const newProductData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await addProduct(item, token);
            setIsNewProduct(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const newProductImageData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await addProductImage(item, token);
        } catch (error) {
            v(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const deleteProductImageData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await deleteImage(id, token);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const updateProductData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await updateProduct(item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteProductData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await deleteProduct(id, token);
            setIsNewProduct(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const newProduct = () => {
        setIsNewProduct(true);
        setProductName(null)
    }

    const onHandlerSelectedCategory = (e) => {
        setSelectedCategory(e.key);
    }

    const getBase64 = (event) => new Promise((resolve, reject) => {
        if (!event) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = "done";
    });

    const onChange = async ({fileList: newFileList}) => {
        let data;
        let newList = [];
        setFileList(newFileList);
        for (let i = 0; i < newFileList.length; i++) {
            if (newFileList[i]) {
                if (!newFileList[i].id) {
                    data = await getBase64(newFileList[i].originFileObj);
                    newList.push({image: data});
                }
            }
        }
        setNewImage(newList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const onRemove = (data) => {
        deleteProductImageData(data.id).then()
    }

    const onHandlerProductName = (e) => {
        const isValidProductName = VALIDATION.PRODUCT_CATEGORY[e.target.name].test(e.target.value);
        if (isValidProductName) {
            setProductName(e.target.value);
        }
        setValidation({
            selectCategory: selectedCategory !== null,
            productName: isValidProductName
        });
    }

    const emptyForm = (<Row gutter={[12, 12]} justify="start">
        <Col className={"gutter-row"} span={18}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <CustomSelect
                        name="selectCategory"
                        label={t("productCategory.selectCategory")}
                        placeholder={t("select")}
                        options={categoryOptions}
                        onChange={(e) => onHandlerSelectedCategory(e)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="productName"
                        label={t("productCategory.productName")}
                        errors={t("validation.productCategory.productName")}
                        validation={validation}
                        onChange={(e) => onHandlerProductName(e)}
                    />
                </Col>
            </Row>
        </Col>
        <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
            <Radio.Group onChange={(e) => {
                newCreateHandler(e)
            }}>
                <Radio.Button className={"save"} value="newItem" disabled={!validPage}>{t("save")}</Radio.Button>
                <Radio.Button className={"cancel"} value="cancel" danger>{t("cancel")}</Radio.Button>
            </Radio.Group>
        </Col>
    </Row>);

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>{t("productCategory.productAddPage")}</div>
            <div className={"card-body"}>
                <Button className={"success"} title={t("productCategory.productAdd")} icon={<PlusOutlined/>}
                        onClick={newProduct}>
                    {t("productCategory.productAdd")}
                </Button>
            </div>
            <div className={"productList card-body"}>
                {isNewProduct && (emptyForm)}
                <List
                    itemLayout="horizontal"
                    dataSource={productList}
                    renderItem={(item) => (<List.Item>
                        <List.Item.Meta
                            title={isUpdateId === item.id ? (<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <FormItem
                                        name="productName"
                                        label={t("productCategory.productName")}
                                        errors={t("validation.productCategory.productName")}
                                        validation={validation}
                                        onChange={(e) => onHandlerProductName(e)}
                                        defaultValue={item.name}
                                    />
                                </Col>
                            </Row>) : <><label className='form-label'
                                               htmlFor={item.name + "_title"}>{t("productCategory.productName")} : </label>
                                <span>{item.name}</span></>}
                            description={<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <Row gutter={[12, 12]} justify="start">
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id && (<>
                                                <Upload
                                                    listType="picture-card"
                                                    type={'drag'}
                                                    multiple={true}
                                                    fileList={fileList}
                                                    onRemove={onRemove}
                                                    onChange={onChange}
                                                    onPreview={handlePreview}
                                                >
                                                    {fileList.length < 5 && '+ Upload'}
                                                </Upload>
                                                {previewImage && (
                                                    <Image
                                                        wrapperStyle={{
                                                            display: 'none',
                                                        }}
                                                        preview={{
                                                            visible: previewOpen,
                                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                        }}
                                                        src={previewImage}
                                                    />
                                                )}
                                            </>)}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ?
                                                <EditingEditor
                                                    ref={editor}
                                                    value={item.detail}
                                                    onChange={(data) => setProductDetail(data)}/>
                                                :
                                                <>
                                                    <label className='form-label' htmlFor={item.name+"_description"}>Ürün Açıklaması ;</label> <ReadEditor
                                                    ref={editorRead}
                                                    value={item.detail}
                                                    disable={true}
                                                />
                                                </>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
                                    {isUpdateId === item.id ? (
                                        <Radio.Group onChange={(e) => {
                                            editingHandler(e, item)
                                        }}>
                                            <Radio.Button className={"save"} value="save" disabled={!validPage}>{t("update")}</Radio.Button>
                                            <Radio.Button className={"cancel"} value="cancel" danger>{t("cancel")}</Radio.Button>
                                        </Radio.Group>) : (
                                        <Radio.Group onChange={(e) => {
                                            editHandler(e, item)
                                        }}>
                                            <Radio.Button className={"update"} value={"edit"} disabled={isNewProduct}>{t("edit")}</Radio.Button>
                                            <Radio.Button className={"delete"} value={"delete"} disabled={isNewProduct}
                                                          danger>{t("delete")}</Radio.Button>
                                        </Radio.Group>)}
                                </Col>
                            </Row>}
                        />
                    </List.Item>)}
                />
            </div>
            <div className="card-footer text-center">
                {
                    (!page.first) &&
                    <button
                        className="btn btn-outline-secondary btn-sm float-start"
                        disabled={page.first}
                        onClick={() => getProducts(page.number - 1)}>
                        {t("preview")}
                    </button>
                }
                {
                    (!page.last) &&
                    <button
                        className="btn btn-outline-secondary btn-sm float-end"
                        disabled={page.last}
                        onClick={() => getProducts(page.number + 1)}>
                        {t("next")}
                    </button>
                }

            </div>
        </div>
    );
}

export default Index;