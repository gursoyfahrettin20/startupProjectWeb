import React from 'react';
import { Form, Input } from 'antd';

export function FormItem(props) {

    const { name, label, autoComplete, message, onChange, isPassword } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            autoComplete={autoComplete ? autoComplete : false}
            rules={[
                {
                    required: true,
                    message: { message },
                },
            ]}
        >
            {isPassword ? <Input.Password onChange={onChange} type="password" /> : <Input onChange={onChange} type="text" />}
        </Form.Item>
    );
}

export default FormItem;