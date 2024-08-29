import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, List, Radio, Row} from 'antd';
import './index.scss'
import {deleteContact, loadContact, newAddContact, updateContact} from "@/api/apiCalls.js";
import {PlusOutlined} from "@ant-design/icons";
import FormItem from "@/components/formItem/FormItem.jsx";
import {usePropState} from "@/shared/context.jsx";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import {VALIDATION} from "@/shared/validate/Validation.js";
import {useTranslation} from "react-i18next";
import {isValidCheck} from "@/shared/validate/IsValidCheck.js";

const Index = () => {
    const {t} = useTranslation();
    const propState = usePropState();
    const [contactList, setContactList] = useState([]);
    const [isUpdateId, setIsUpdateId] = useState(0);
    const [isNewContact, setIsNewContact] = useState(false);
    const [updateItem, setUpdateItem] = useState({});
    const [validation, setValidation] = useState({
        branchName: true,
        address: true,
        mobilNumber: true,
        branchNumber: true,
        mail: true,
        maps: true,
    });
    const [validPage, setValidPage] = useState(false);
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.lang);

    useEffect(() => {
        setValidPage(!isValidCheck(validation));
    }, [validation]);

    useEffect(() => {
        if (!_.isEqual(lang, localStorage.lang)) {
            navigate(0);
        }
    }, [localStorage.lang]);

    const getContact = useCallback(async () => {
        const response = await loadContact();
        let langForList = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].language === localStorage.lang) {
                langForList.push(response.data[i]);
            }
        }
        setContactList(langForList);
        setLang(localStorage.lang)
    }, []);

    useEffect(() => {
        getContact().then();
    }, []);

    const editHandler = (e, item) => {
        if (e.target.value === "update") {
            setIsUpdateId(item.id);
        } else {
            deleteContactData(item.id).then();
        }
        setValidation({
            branchName: true,
            address: true,
            mobilNumber: true,
            branchNumber: true,
            mail: true,
            maps: true,
        });
    }

    const editingHandler = (e, item) => {
        const newData = {
            language: localStorage.lang,
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
        setValidation({
            branchName: true,
            address: true,
            mobilNumber: true,
            branchNumber: true,
            mail: true,
            maps: true,
        });
    }
    const updateItemHandler = (e, value) => {
        let _value = _.cloneDeep(value);
        if (e.target.name === "maps" && value !== "" && _value.search('src="') !== -1) {
            _value = _value.split('src="')[1].split('" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')[0];
        }
        const isValid = VALIDATION.CONTACT[e.target.name].test(_value);
        setValidation({
            ...validation,
            [e.target.name]: isValid
        })
        const newData = {
            language: localStorage.lang,
            ...updateItem, [e.target.id]: _value
        }
        setUpdateItem(newData);
    }

    const newContactData = useCallback(async (id, item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await newAddContact(id, item, token);
            setIsNewContact(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsNewContact(false);
        }

    }, []);

    const updateContactData = useCallback(async (id, item) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await updateContact(id, item, token);
            setIsUpdateId(0);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsUpdateId(0);
        }

    }, []);

    const deleteContactData = useCallback(async (id) => {
        const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")).token : null;
        try {
            await deleteContact(id, token);
            setIsNewContact(false);
            navigate(0);
        } catch (error) {
            console.log(error.response.data.message);
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
                            label={t("contact.branchName") + " : "}
                            errors={t("validation.contact.branchName")}
                            validation={validation}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="address"
                            label={t("contact.address") + " : "}
                            errors={t("validation.contact.address")}
                            validation={validation}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="mobilNumber"
                            label={t("contact.mobilNumber") + " : "}
                            errors={t("validation.contact.mobilNumber")}
                            validation={validation}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="branchNumber"
                            label={t("contact.branchNumber") + " : "}
                            errors={t("validation.contact.branchNumber")}
                            validation={validation}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="mail"
                            label={t("contact.mail") + " : "}
                            errors={t("validation.contact.mail")}
                            validation={validation}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                    <Col className={"gutter-row"} span={24}>
                        <FormItem
                            name="maps"
                            label={t("contact.maps") + " : "}
                            errors={t("validation.contact.maps")}
                            validation={validation}
                            onChange={(e) => updateItemHandler(e, e.target.value)}
                        />
                    </Col>
                </Row>
            </Col>
            <Col className={"gutter-row custom-radio-btn"} span={6} style={{textAlign: "right"}}>
                <Radio.Group onChange={(e) => {
                    editingHandler(e)
                }}>
                    <Radio.Button className={"save"} value="newItem" disabled={!validPage}>{t("save")}</Radio.Button>
                    <Radio.Button className={"cancel"} value="cancel"
                                  danger>{t("cancel")}</Radio.Button>
                </Radio.Group>
            </Col>
        </Row>
    );

    return (
        <div className={"card"}>
            <div className={"card-header text-center fs-4"}>{t("contact.contactPageEditing")}</div>
            <div className={"card-body"}>
                <Button className={"success"} title={t("contact.addNewContactInformation")} disabled={isNewContact} icon={<PlusOutlined/>}
                        onClick={newContact}>
                    {t("contact.addNewContactInformation")}
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
                                        label={t("contact.branchName") + " : "}
                                        defaultValue={item.branchName}
                                        errors={t("validation.contact.branchName")}
                                        validation={validation}
                                        onChange={(e) => updateItemHandler(e, e.target.value)}
                                    />
                                </Col>
                                </Row>) :
                                <span>{item.branchName}</span>}
                            description={<Row gutter={[12, 12]} justify="start">
                                <Col className={"gutter-row"} span={18}>
                                    <Row gutter={[12, 12]} justify="start">
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="address"
                                                label={t("contact.address") + " : "}
                                                defaultValue={item.address}
                                                errors={t("validation.contact.address")}
                                                validation={validation}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.address}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="mobilNumber"
                                                label={t("contact.mobilNumber") + " : "}
                                                defaultValue={item.mobilNumber}
                                                errors={t("validation.contact.mobilNumber")}
                                                validation={validation}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.mobilNumber}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="branchNumber"
                                                label={t("contact.branchNumber") + " : "}
                                                defaultValue={item.branchNumber}
                                                errors={t("validation.contact.branchNumber")}
                                                validation={validation}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.branchNumber}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {isUpdateId === item.id ? (<FormItem
                                                name="mail"
                                                label={t("contact.mail") + " : "}
                                                defaultValue={item.mail}
                                                errors={t("validation.contact.mail")}
                                                validation={validation}
                                                onChange={(e) => updateItemHandler(e, e.target.value)}
                                            />) : <span>{item.mail}</span>}
                                        </Col>
                                        <Col className={"gutter-row"} span={24}>
                                            {
                                                isUpdateId === item.id ? (<FormItem
                                                        name="maps"
                                                        label={t("contact.maps") + " : "}
                                                        defaultValue={item.maps}
                                                        errors={t("validation.contact.maps")}
                                                        validation={validation}
                                                        onChange={(e) => updateItemHandler(e, e.target.value)}
                                                    />) :
                                                    item.maps && (
                                                        <iframe
                                                            src={item.maps.toString()}
                                                            width="100%" height="450" style={{border: "0"}}
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
                                        <Radio.Button className={"save"} value="save" disabled={!validPage}>{t("save")}</Radio.Button>
                                        <Radio.Button className={"cancel"} value="cancel"
                                                      danger>{t("cancel")}</Radio.Button>
                                    </Radio.Group>) : (<Radio.Group onChange={(e) => {
                                        editHandler(e, item)
                                    }}>
                                        <Radio.Button className={"update"} value={"update"} disabled={isNewContact}>{t("edit")}</Radio.Button>
                                        <Radio.Button className={"delete"} value={"delete"}  disabled={isNewContact}
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