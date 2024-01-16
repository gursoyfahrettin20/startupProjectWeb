import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

export function FormItem(props) {

    const { name, label, autoComplete, message, onChange, isPassword, db_message } = props;
    const [validMessage, setValidMessage] = useState();

    useEffect(() => {
        setValidMessage(message?message:db_message);
    })

    return (
        <Form.Item
            label={label}
            name={name}
            autoComplete={autoComplete ? autoComplete : false}
            messageVariables={"asdasd"}
            rules={[
                {
                    required: true,
                    message: validMessage,
                },
            ]}
        >
            {isPassword ? <Input.Password onChange={onChange} type="password" /> : <Input onChange={onChange} type="text" />}
       </Form.Item>
    );
}

export default FormItem;