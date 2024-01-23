import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { singUp } from "../../api/apiCalls.js";
import { singUp } from "../../components/header";
import { FormItem } from "../../components/formItem/formItem.jsx";

function index() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [succesMessage, setSuccesMessage] = useState();
    const [submittable, setSubmittable] = useState(false);
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalErrors, setGeneralErrors] = useState({});
    // const [passwordRepeatError, setPasswordRepeatError] = useState("")

    useEffect(() => {
        setErrors((lastErrors) => { return { ...lastErrors, username: undefined } })
    }, [username])

    useEffect(() => {
        setErrors((lastErrors) => { return { ...lastErrors, email: undefined } })
    }, [email])

    useEffect(() => {
        setErrors((lastErrors) => { return { ...lastErrors, password: undefined } })
    }, [password])

    // 1. yöntem
    const passwordRepeatError = useMemo(() => {
        if (password && password !== passwordRepeat) {
            return ("Şifreler Eşleşmiyor.");
        }
        return "";
    }, [password, passwordRepeat]);

    // 2. yöntem
    /* useEffect(() => {
        if (password && password !== passwordRepeat) {
            setPasswordRepeatError("Şifreler Eşleşmiyor.");
        }
    }, [password, passwordRepeat]) */

    const onSubmit = async (event) => {
        event.preventDefault();
        setSuccesMessage();
        setGeneralErrors();
        setApiProgress(true);
        const data = {
            username: username,
            email: email,
            password: password
        };
        try {
            const response = await singUp(data);
            setSuccesMessage(response.data?.message)
            setUsername();
            setPassword();
            setPasswordRepeat();
            setEmail();
        } catch (responseError) {
            if (responseError.response?.data && responseError.response?.data.status === 400) {
                setErrors(responseError.response?.data.validationErrors)
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
            <TopBar />

            <div className='container'>
                <form className='card col-lg-6 offset-lg-3' onSubmit={onSubmit}>
                    <div className='col-lg-12'>
                        <div className='text-center card-header'>
                            <h1>Sing Up</h1>
                        </div>
                        <div className='card-body col-lg-12'>
                            <FormItem
                                name="username"
                                label="User Name"
                                errors={errors.username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormItem
                                name="email"
                                label="E-Mail"
                                errors={errors.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormItem
                                name="password"
                                label="Password"
                                errors={errors.password || passwordRepeatError}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormItem
                                name="passwordRepeat"
                                label="Password Repeat"
                                errors={passwordRepeatError}
                                type="password"
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Otomatik Giriş yapılsın mı?
                                </label>
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-primary' disabled={apiProgress ? apiProgress : !submittable}>
                                    <Spin style={{ display: apiProgress ? "inline" : "none" }}
                                        indicator={<LoadingOutlined style={{ fontSize: 24, marginRight: 15 }} spin />} />
                                    {apiProgress ? "Yeni Üye Oluşturuluyor..." : "Yeni Üye Oluştur"}
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