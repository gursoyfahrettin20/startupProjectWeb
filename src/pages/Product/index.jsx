import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {addProduct, addProductImage, deleteProduct, loadCategory, loadProduct, updateProduct} from "@/api/apiCalls.js";
import {Button, Col, List, Radio, Row} from "antd";
import FormItem from "@/components/formItem/FormItem.jsx";
import JoditEditor from "jodit-react";
import {PlusOutlined} from "@ant-design/icons";
import CustomSelect from "@/components/customSelect/CustomSelect.jsx";
import _ from "lodash";
import {Image, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';

function Index(props) {
    const editor = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [productName, setProductName] = useState({});
    const [newImage, setNewImage] = useState([]);
    const [productDetail, setProductDetail] = useState("");
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryAndProduct().then();
    }, []);

    useEffect(() => {
        for (let i = 0; i < productList.length; i++) {
            if (productList.length > 0 && productList.id === isUpdateId) {
                let img = [];
                for (let j = 0; j < productList[i].productToImages.length; j++) {
                    img.push({
                        uid: productList[i].productToImages[j].id,
                        name: productList[i].productToImages[j].image,
                        status: 'done',
                        url: productList[i].productToImages[j].image,
                    })
                }
                setFileList(img);
            }
        }
    }, [isUpdateId]);

    const getCategoryAndProduct = useCallback(async () => {
        const responseCategory = await loadCategory();
        setCategoryList(responseCategory.data);
        const responseProduct = await loadProduct();
        setProductList(responseProduct.data);
    }, []);

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
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteProductData(item.id).then()
        }
    }

    const editingHandler = (e, item) => {
        const newData = {
            name: productName, detail: productDetail
        }

        if (e.target.value === "save") {
            const index = _.findIndex(productList, (data) => {
                return data.id === item.id;
            })
            for(let i =0; i<newImage.length; i++){
                newImage[i]["products"] = productList[index];
            }
            newProductImageData(newImage).then();
            newData["id"] = productList[index].id;
            newData["productToImages"] = newImage;
            updateProductData(newData).then();
        } else if (e.target.value === "newItem") {
            const indexCategory = _.findIndex(categoryList, (data) => {
                return data.id === selectedCategory;
            })
            newData["categories"] = categoryList[indexCategory];
            newProductData(newData).then();
        } else {
            setIsUpdateId(0);
            setIsNewProduct(false);
        }
    }

    const newProductData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await addProduct(item, token);
            setIsNewProduct(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const newProductImageData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await addProductImage(item, token);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const updateProductData = useCallback(async (item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await updateProduct(item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteProductData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await deleteProduct(id, token);
            setIsNewProduct(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewProduct(false);
        }

    }, []);

    const newProduct = () => {
        setIsNewProduct(true);
        setProductName({})
    }

    const onHandlerSelectedCategory = (e) => {
        setSelectedCategory(e.key);
    }

    const getBase64 = (event) =>
        new Promise((resolve, reject) => {
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
                data = await getBase64(newFileList[i].originFileObj);
                newList.push({image: data});
            }
        }
        setNewImage(newList);
    };

    const onPreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const emptyForm = (<Row gutter={[12, 12]} justify="start">
        <Col className={"gutter-row"} span={18}>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={24}>
                    <CustomSelect
                        name="selectCategory"
                        label={"Kategori Seçimi"}
                        placeholder={"Seçim yapınız."}
                        options={categoryOptions}
                        onChange={(e) => onHandlerSelectedCategory(e)}
                    />
                </Col>
                <Col className={"gutter-row"} span={24}>
                    <FormItem
                        name="productName"
                        label={"Ürün Adı"}
                        onChange={(e) => setProductName(e.target.value)}
                    />
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

    return (<div className={"card"}>
        <div className={"card-header text-center fs-4"}>Ürün Ekleme Sayfası</div>
        <div className={"card-body"}>
            <Button className={"success"} title={"Yeni Ürün Ekle"} icon={<PlusOutlined/>}
                    onClick={newProduct}>
                Yeni Ürün Ekle
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
                                    label={"Ürün Adı"}
                                    defaultValue={item.name}
                                    // errors={errors.branchName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Col>
                        </Row>) : <span>{item.name}</span>}
                        description={<Row gutter={[12, 12]} justify="start">
                            <Col className={"gutter-row"} span={18}>
                                <Row gutter={[12, 12]} justify="start">
                                    <Col className={"gutter-row"} span={24}>
                                        {isUpdateId === item.id && (
                                            <ImgCrop rotationSlider>
                                                <Upload
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={onChange}
                                                    preview={{
                                                        visible: previewOpen,
                                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                    }}
                                                    onPreview={onPreview}
                                                >
                                                    {fileList.length < 5 && '+ Upload'}
                                                </Upload>
                                            </ImgCrop>
                                        )}
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
                                    </Col>
                                    <Col className={"gutter-row"} span={24}>
                                        {isUpdateId === item.id ? (<JoditEditor ref={editor} value={item.detail}
                                                                                onChange={(data) => setProductDetail(data)}/>) :
                                            <JoditEditor config={{
                                                readonly: true,
                                                useSearch: false,
                                                toolbar: false,
                                                showCharsCounter: false,
                                                showWordsCounter: false,
                                                showXPathInStatusbar: false
                                            }} ref={editor} value={item.detail} disable={true}/>}
                                    </Col>
                                </Row>
                            </Col>
                            <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
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
    </div>);
}

export default Index;