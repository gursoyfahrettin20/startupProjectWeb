import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

export function FormItem({ name, label, autoComplete, message, onChange, isPassword }) {
    const [msg, setNsg] = useState()

    useEffect(() => {
        if (message) {
            useState(message);
        }

    }, [message])


    return (
        <Form.Item
            label={label}
            name={name}
            autoComplete={autoComplete ? autoComplete : false}
            messageVariables={"asdasd"}
            rules={[
                {
                    required: true,
                    message: msg,
                },
            ]}
        >
            {isPassword ? <Input.Password onChange={onChange} type="password" /> : <Input onChange={onChange} type="text" />}
        </Form.Item>
    );
}

export default FormItem;