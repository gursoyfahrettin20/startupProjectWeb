import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { singUp } from "@/api/apiCalls.js";
import { FormItem } from "@/components/formItem/formItem.jsx";
import { useTranslation } from "react-i18next"
import  Alert  from "@/components/alert"

function index() {
    const { t } = useTranslation();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [submittable, setSubmittable] = useState(false);
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalErrors, setGeneralErrors] = useState(null);

    useEffect(() => {
        setErrors((lastErrors) => { return { ...lastErrors, username: undefined } })
        setGeneralErrors(null)
    }, [username])

    useEffect(() => {
        setErrors((lastErrors) => { return { ...lastErrors, email: undefined } })
        setGeneralErrors(null)
    }, [email])

    useEffect(() => {
        setErrors((lastErrors) => { return { ...lastErrors, password: undefined } })
        setGeneralErrors(null)
    }, [password])

    // 1. yöntem
    const passwordRepeatError = useMemo(() => {
        if (password && password !== passwordRepeat) {
            return ("Şifreler Eşleşmiyor.");
        }
        return "";
    }, [password, passwordRepeat]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage();
        setGeneralErrors();
        setApiProgress(true);
        const data = {
            username: username,
            email: email,
            password: password
        };
        try {
            const response = await singUp(data);
            setSuccessMessage(response.data?.message)
            setUsername();
            setPassword();
            setPasswordRepeat();
            setEmail();
        } catch (responseError) {
            if (responseError.response?.data) {
                if (responseError.response?.data.status === 400) {
                    setErrors(responseError.response?.data.validationErrors)
                }
                else {
                    setGeneralErrors(responseError.response?.data.message)
                }
            }
            else {
                setGeneralErrors("Tahmin Edilemeyen Hatalarda gösterilecektir. / Unexpected error occured. Pleace try again.");
            }
        } finally {
            setApiProgress(false);
        }
    }

    // TODO: Sign Up butonu disabled durumlarına bakıyor.
    useEffect(() => {
        let _submittable = false;
        if (_.isUndefined(password) || _.isNull(password) || _.isEmpty(password)) {
            _submittable = false;
        } else if (password === passwordRepeat) {
            _submittable = true;
        }
        setSubmittable(_submittable);
    });

    return (
        <>
            <div className='container'>
                <form className='card col-lg-6 offset-lg-3' onSubmit={onSubmit}>
                    <div className='col-lg-12'>
                        <div className='text-center card-header'>
                            <h1>{t("singUp")}</h1>
                        </div>
                        <div className='card-body col-lg-12'>
                            <FormItem
                                name="username"
                                label={t("username")}
                                errors={errors.username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormItem
                                name="email"
                                label={t("email")}
                                errors={errors.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormItem
                                name="password"
                                label={t("password")}
                                errors={errors.password || passwordRepeatError}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormItem
                                name="passwordRepeat"
                                label={t("passwordRepeat")}
                                errors={passwordRepeatError}
                                type="password"
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            />
                            {
                                generalErrors && (<Alert status={generalErrors} styleType={"danger"} />)
                            }
                            {
                                successMessage && (<Alert status={successMessage} styleType={"success"} />)
                            }
                            <div className='text-center'>
                                <button className='btn btn-primary' disabled={apiProgress ? apiProgress : !submittable}>
                                    <Spin style={{ display: apiProgress ? "inline" : "none" }}
                                        indicator={<LoadingOutlined style={{ fontSize: 24, marginRight: 15 }} spin />} />
                                    {apiProgress ? "Yeni Üye Oluşturuluyor..." : t("singUp")}
                                </button>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </>
    );
}
export default index;