import React, { useState } from 'react';

export function FormItem({ name, label, onChange, errors, type }) {

    return (
        <div className='mb-12'>
            <label className='form-label' htmlFor={name}> {label} </label>
            <input id={name} className={errors ? 'form-control is-invalid' : 'form-control'} type={type ? type : "text"} onChange={onChange} />
            <div className='invalid-feedback'>{errors}</div>
        </div>
    );
}

export default FormItem;