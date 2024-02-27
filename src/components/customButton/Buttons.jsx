import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import {useTranslation} from "react-i18next";

export default function Buttons(props) {
    const {t} = useTranslation();

    return (
        <button
            className={props.styleType ? `btn btn-${props.styleType}` : `btn btn-primary`}
            onClick={props.onClick}
            disabled={props.disabled ? props.disabled : false}>
            <Spin style={{display: props.apiProgress ? "inline" : "none"}}
                  indicator={<LoadingOutlined style={{fontSize: 24, marginRight: 15}} spin/>}/>
            {props.apiProgress ? t("loading") : props.label}
        </button>
    );
}