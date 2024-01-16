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
                label="User Name"
                name="username"
                autoComplete='false'
                isPassword={false}
                // message={!_.isEmpty(errors) ? errors : ""}
                message={'Please input your username!'}
                onChange={(e) => setUsername(e.target.value)}
            />
            <FormItem
                label="E Mail"
                name="email"
                autoComplete='false'
                isPassword={false}
                // message={!_.isEmpty(errors) ? errors : ""}
                message={'Please input your username!'}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormItem
                label="Password"
                name="password"
                isPassword={true}
                autoComplete='false'
                // message={!_.isEmpty(errors) ? errors : ""}
                message={'Please input your username!'}
                onChange={(e) => setPassword(e.target.value)}
            />
            <FormItem
                label="Password Repeat"
                name="passwordRepeat"
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
    );
}
export default index;