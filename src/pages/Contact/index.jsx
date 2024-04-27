import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, List, Row, Radio} from 'antd';
import './index.scss'
import {deleteContact, loadContact, newAddContact, updateContact} from "@/api/apiCalls.js";
import {PlusOutlined} from "@ant-design/icons";
import FormItem from "@/components/formItem/FormItem.jsx";
import {usePropState} from "@/shared/context.jsx";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const propState = usePropState();
    const [errorMessage, setErrorMessage] = useState("");
    const [contactList, setContactList] = useState([]);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewContact, setIsNewContact] = useState(false);
    const [updateItem, setUpdateItem] = useState({});
    const navigate = useNavigate();

    const getContact = useCallback(async () => {
        const response = await loadContact();
        setContactList(response.data);
    }, []);

    useEffect(() => {
        getContact().then();
    }, []);

    const editHandler = (e, item) => {
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteContactData(item.id).then()
        }
    }

    const editingHandler = (e, item) => {
        const newData = {
            ...item, ...updateItem
        }
        if (e.target.value === "save") {
            updateContactData(propState.id, newData).then();
        } else if (e.target.value === "newItem") {
            newContactData(propState.id, updateItem).then();
        } else {
            setIsUpdateId(0);
            setIsNewContact(false);
        }
    }
    const updateItemHandler = (e, value) => {
        const newData = {
            ...updateItem, [e.target.id]: value
        }
        setUpdateItem(newData);
    }

    const newContactData = useCallback(async (id, item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await newAddContact(id, item, token);
            setIsNewContact(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewContact(false);
        }

    }, []);

    const updateContactData = useCallback(async (id, item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await updateContact(id, item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteContactData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            const response = await deleteContact(id, token);
            setIsNewContact(false);
            navigate(0);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        } finally {
            setIsNewContact(false);
        }

    }, []);

    const newContact = () => {
        setIsNewContact(true);
        setUpdateItem({})
    }

    const emptyForm = (
        <Row gutter={[12, 12]} justify="start">
            <Col className={"gutter-row"} span={18}>
                <Row gutter={[12, 12]} justify="start">
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="branchName"
                            label={"Şube Adı"}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="address"
                            label={"Şube Adresi"}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="mobilNumber"
                            label={"Cep Numarası"}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="branchNumber"
                            label={"Şirket Numarası"}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="mail"
                            label={"Şirket Mail"}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="maps"
                            label={"Harita"}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
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
        </Row>
    );

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>İletişim Sayfası Düzenleme</div>
            <div className={"card-body"}>
                <Button className={"success"} title={"Yeni İletişim Bilgileri Ekle"} icon={<PlusOutlined/>}
                        onClick={newContact}>
                    Yeni İletişim Bilgileri Ekle
                </Button>
            </div>
            <div className={"contactList card-body"}>
                {isNewContact && (emptyForm)}
                <List
                    itemLayout="horizontal"
                    dataSource={contactList}
                    renderItem={(item) => (<List.Item>
                        <List.Item.Meta
                            title={isUpdateId === item.id ? (<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <FormItem
                                        name="branchName"
                                        label={"Şube Adı"}
                                        defaultValue={item.branchName}
                                        // errors={errors.branchName}
                                        onChange={(e) => updateItemHandler(e, e.target.value)}
                                    />
                                </Col>
                            </Row>) : <span>{item.branchName}</span>}
                            description={<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <Row gutter={[12, 12]} justify="start">
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="address"
                                                label={"Şube Adresi"}
                                                defaultValue={item.address}
                                                // errors={errors.address}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.address}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="mobilNumber"
                                                label={"Cep Numarası"}
                                                defaultValue={item.mobilNumber}
                                                // errors={errors.mobilNumber}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.mobilNumber}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="branchNumber"
                                                label={"Şirket Numarası"}
                                                defaultValue={item.branchNumber}
                                                // errors={errors.mobilNumber}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.branchNumber}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="mail"
                                                label={"Şirket Mail"}
                                                defaultValue={item.mail}
                                                // errors={errors.mail}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.mail}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {
                                                isUpdateId === item.id ? (<FormItem
                                                    name="maps"
                                                    label={"Harita"}
                                                    defaultValue={item.maps}
                                                    // errors={errors.maps}
                                                    onChange={(e) => updateItemHandler(e, e.target.value)}
                                                />) : (
                                                    <iframe
                                                        src={"https://www.google.com/maps/embed?" + item.maps.toString()}
                                                        width="600" height="450" style={{border: "0"}}
                                                        allowFullScreen=""
                                                        loading="lazy"
                                                        referrerPolicy="no-referrer-when-downgrade"></iframe>

                                                )
                                            }
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
};

export default Index;