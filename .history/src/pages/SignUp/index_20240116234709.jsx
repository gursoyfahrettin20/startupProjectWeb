import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Checkbox, Form, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { singUp } from "../../api/apiCalls.js";
import { FormItem } from "../../components/formItem/formItem.jsx";

function index() {
    const [form] = Form.useForm();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [submittable, setSubmittable] = useState(false);
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, description, type, placement) => {
        api[type]({
            message: message,
            description: description,
            placement: placement ? placement : 'topRight'
        });
    };

    const onSubmit = async (event) => {
        setApiProgress(true);
        const data = {
            username: username,
            email: email,
            password: password
        };
        try {
            const response = await singUp(data);
            openNotification("Yeni Kullanıcı", response.data.message, "success", 'topRight');
            setUsername();
            setPassword();
            setPasswordRepeat();
            setEmail();
        } catch (responseError) {
            if (responseError.response?.data && responseError.response?.data.status === 400) {
                setErrors(responseError.response?.data.validationErrors)
                openNotification("Hata Oluştu !", "", "warning", 'topRight');
            }
            else {
                openNotification("Hata Oluştu !", "Tahmin Edilemeyen Hatalarda gösterilecektir. / Unexpected error occured. Pleace try again.", "error", 'topRight');
            }
        } finally {
            setApiProgress(false);
        }
    }

    const values = Form.useWatch([], form);
    // TODO: Sign Up butonu disabled durumlarına bakıyor.
    useEffect(() => {
        let _submittable = false;
        if (_.isUndefined(password) || _.isNull(password) || _.isEmpty(password)) {
            _submittable = false;
        } else if (password === passwordRepeat) {
            _submittable = true;
        }
        setSubmittable(_submittable);
    }, [values]);


    return (
        <>
        <h1>Sing Up</h1>
        <div>
            <label htmlFor='username'> User Name </label>  
            <input id="username" type="text" />
        </div>
        <div>
            <label htmlFor='email'> E-Mail </label>  
            <input id="email" type="text" />
        </div>
        <div>
            <label htmlFor='password'> Password </label>  
            <input id="password" type="password" />
        </div>
        <div>
            <label htmlFor='passwordRepeat'> Password Repeat </label>  
            <input id="passwordRepeat" type="password" />
        </div>
        <button>{apiProgress ? "Yeni Üye Oluşturuluyor..." : "Yeni Üye Oluştur"}</button>
            <Form
                name="signUp"
                form={form}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, }}
                initialValues={{ remember: true, }}
                onFinish={onSubmit}
                autoComplete="off">
                <FormItem
                    id="username"
                    name="username"
                    label="User Name"
                    autoComplete='false'
                    isPassword={false}
                    db_message={!_.isEmpty(errors) ? errors.username : ""}
                    message={'Please input your username!'}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormItem
                    id="email"
                    name="email"
                    label="E Mail"
                    autoComplete='false'
                    isPassword={false}
                    db_message={!_.isEmpty(errors) ? errors.email : ""}
                    message={'Please input your email!'}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormItem
                    id="password"
                    name="password"
                    label="Password"
                    isPassword={true}
                    autoComplete='false'
                    db_message={!_.isEmpty(errors) ? errors.password : ""}
                    message={'Please input your username!'}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormItem
                    id="passwordRepeat"
                    name="passwordRepeat"
                    label="Password Repeat"
                    isPassword={true}
                    autoComplete='false'
                    message='Please input your password Repeat!'
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                />
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16, }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                    <Button type="primary" htmlType="submit" disabled={apiProgress ? apiProgress : !submittable}>
                        <Spin style={{ display: apiProgress ? "inline" : "none" }}
                            indicator={<LoadingOutlined style={{ fontSize: 24, marginRight: 15 }} spin />} />
                        {apiProgress ? "Yeni Üye Oluşturuluyor..." : "Yeni Üye Oluştur"}
                    </Button>
                </Form.Item>
                {/* todo: notification çıkartmak konulmuştur */}
                {contextHolder}
            </Form>
        </>
    );
}
export default index;