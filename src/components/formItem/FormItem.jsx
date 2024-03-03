import React, {useState} from 'react';

export function FormItem({name, label, onChange, errors, type, defaultValue}) {

    return (
        <div className='mb-3'>
            <label className='form-label' htmlFor={name}> {label} </label>
            <input id={name}
                   className={errors ? 'form-control is-invalid' : 'form-control'}
                   type={type ? type : "text"}
                   onChange={onChange}
                   // value={defaultValue}
                   defaultValue={defaultValue}
            />
            <div className='invalid-feedback'>{errors}</div>
        </div>
    );
}

export default FormItem;