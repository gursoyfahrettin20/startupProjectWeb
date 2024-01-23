import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Checkbox, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { singUp } from "../../api/apiCalls.js";
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
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        setErrors({})
    }, [username])

    const onSubmit = async (event) => {
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
        <div className='container'>
            <form className='card' onSubmit={onSubmit}>
                <div className='col-lg-6 offset-lg-3 col-sm-8 offset-sm-2'>
                    <div className='text-center card-header'>
                        <h1>Sing Up</h1>
                    </div>
                    <div className='card-body'>
                        <FormItem
                            name="username"
                            label="User Name"
                            errors={errors}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormItem
                            name="email"
                            label="E-Mail"
                            errors={errors}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormItem
                            name="password"
                            label="Password"
                            errors={errors}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormItem
                            name="passwordRepeat"
                            label="Password Repeat"
                            errors={errors}
                            type="password"
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                        <div className='text-center'>
                            <Checkbox>Remember me</Checkbox>
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
    );
}
export default index;