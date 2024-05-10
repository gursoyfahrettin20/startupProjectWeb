import {Col, Row} from "antd";

export function FormItem(props) {

    return (
        <div className='mb-3'>
            <Row gutter={[12, 12]} justify="start">
                <Col className={"gutter-row"} span={6} style={{lineHeight: "35px", textAlign: "left"}}>
                    <label className='form-label' htmlFor={props.name}> {props.label} </label>
                </Col>
                <Col className={"gutter-row"} span={18}>
                    <input
                        id={props.name}
                        name={props.name}
                        className={props.errors ? 'form-control is-invalid' : 'form-control'}
                        type={props.type ? props.type : "text"}
                        onChange={props.onChange}
                        defaultValue={props.defaultValue}
                    />
                </Col>
            </Row>
            <div className='invalid-feedback'>{props.errors}</div>
        </div>
    );
}

export default FormItem;