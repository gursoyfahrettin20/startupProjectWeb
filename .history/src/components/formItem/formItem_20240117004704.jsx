import React, { useState } from 'react';

export function FormItem({ name, label, onChange, errors, type }) {
    const [msg, setNsg] = useState()

    return (
        <div className='mb-3'>
            <label className='form-label' htmlFor={name}> {label} </label>
            <input id={name} className={errors?.[name] ? 'form-control is-invalid' : 'form-control'} type={type ? type : "text"} onChange={onChange} />
            <div className='invalid-feedback'>errors?.[name]</div>
        </div>
    );
}

export default FormItem;