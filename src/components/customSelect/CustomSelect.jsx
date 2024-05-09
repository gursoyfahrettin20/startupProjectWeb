import React, {useState} from 'react';
import {Col, Row, Select} from 'antd';
import _ from "lodash";

const CustomSelect = (props) => {
    const [searchOption, setSearchOption] = useState([]);

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const onSearch = (e, b) => {
        let array = _.cloneDeep(searchOption);
        if ((e?.label ?? '').toLowerCase().includes(e.toLowerCase())) {
            array.push({
                label: e.label, value: e.value
            });

        } else if (!e.value) {
            array = [];
        }
        setSearchOption(array);
    };

    return (<div className='mb-3'>
        <Row gutter={[12, 12]} justify="start">
            <Col className={"gutter-row"} span={6} style={{lineHeight: "35px", textAlign: "left"}}>
                <label className='form-label' htmlFor={props.name}> {props.label} </label>
            </Col>
            <Col className={"gutter-row"} span={18}>
                <Select
                    key={props.name}
                    disabled={props.disabled ? props.disabled : false}
                    labelInValue={props.label}
                    showSearch={true}
                    placeholder={props.placeholder ? props.placeholder : "Seçim yapınız."}
                    optionFilterProp="children"
                    onChange={props.onChange}
                    filterOption={filterOption}
                    options={searchOption.length > 0 ? searchOption : props.options}
                    style={{width: "100%"}}
                />
            </Col>
        </Row>
        <div className='invalid-feedback'>{props.errors}</div>
    </div>);
};

export default CustomSelect;