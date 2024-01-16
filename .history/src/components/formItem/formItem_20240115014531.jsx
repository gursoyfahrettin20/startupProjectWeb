import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

export function FormItem({ name, label, autoComplete, message, onChange, isPassword }) {

    return (
        <Form.Item
            label={label}
            name={name}
            autoComplete={autoComplete ? autoComplete : false}
            messageVariables={"asdasd"}
            rules={[
                {
                    required: true,
                    message: message,
                },
            ]}
        >
            {isPassword ? <Input.Password onChange={onChange} type="password" /> : <Input onChange={onChange} type="text" />}
       </Form.Item>
    );
}

export default FormItem;