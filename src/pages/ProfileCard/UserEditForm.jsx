import {useEffect, useState} from 'react';
import FormItem from "@/components/formItem/FormItem.jsx";
import Alert from "@/components/alert/index.jsx";
import Buttons from "@/components/customButton/Buttons.jsx";
import {updateUser} from "@/api/apiCalls.js";
import {usePropDispatch, usePropState} from "@/shared/context.jsx";
import {useTranslation} from "react-i18next";
import {Space} from 'antd';
import {Col, Row} from "antd";

function UserEditForm(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const dispatch = usePropDispatch();
    const [newUsername, setNewUsername] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalErrors, setGeneralErrors] = useState(null);
    const [newImage, setNewImage] = useState();

    useEffect(() => {
        setNewUsername(props.user.username);
        props.isUpdated(false);
    }, [props.user.username]);

    const onChangeUsername = (event) => {
        setNewUsername(event.target.value);
        setErrors((lastErrors) => {
            return {...lastErrors, username: undefined}
        })
        setGeneralErrors(null)
    }

    const onSelectImage = (event) => {
        if (event.target.files < 1) {
            return;
        }
        setErrors((lastErrors) => {
            return {
                ...lastErrors,
                image: undefined
            }
        })
        setGeneralErrors(null)
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const data = fileReader.result;
            setNewImage(data);
            props.setTempImage(data);
        }
        fileReader.readAsDataURL(file);
    }

    const onClickSave = async () => {
        setApiProgress(true);
        setErrors({});
        setGeneralErrors();
        try {
            const {data} = await updateUser(props.user.id, {username: newUsername, image: newImage});
            if (propState.id === props.user.id) {
                dispatch({type: "user-update-data", data: {username: data.username, image: data.image}})
            }
            props.isUpdated(true);
            props.setEditMode(false);
        } catch (responseError) {
            if (responseError.response?.data) {
                if (responseError.response?.data.status === 400) {
                    setErrors(responseError.response?.data["validationErrors"])
                } else {
                    setGeneralErrors(responseError.response?.data.message)
                }
            } else {
                setGeneralErrors("Tahmin Edilemeyen Hatalarda gösterilecektir. / Unexpected error occured. Pleace try again.");
            }
        } finally {
            setApiProgress(false);
        }
    }

    const onChangeCancel = () => {
        props.setEditMode(false);
        setNewUsername(props.user.username);
        setNewImage();
        props.setTempImage();
    }

    return (
        <Row gutter={[12, 12]} justify="start">
            <Col className={"gutter-row"} xxl={12} xl={12} lg={12} sm={24} md={24} xs={24}>
                <FormItem
                    name="username"
                    label={t("username")}
                    defaultValue={newUsername}
                    errors={errors.username}
                    onChange={onChangeUsername}
                />
            </Col>
            <Col xxl={12} xl={12} lg={24} sm={24} md={24} xs={24}>
                <Space direction="vertical" style={{width: '100%', textAlign: "left"}} size="large">
                    <FormItem
                        name="picture"
                        label={t("userPictureAdd")}
                        onChange={onSelectImage}
                        type={"file"}
                        errors={errors.image}
                    />
                </Space>
            </Col>

            {generalErrors && (
                <Col span={24}>
                    <Alert status={generalErrors} styleType={"danger"}/>
                </Col>
            )}
            {errors.image && (
                <Col span={24}>
                    <Alert status={errors.image} styleType={"danger"}/>
                </Col>
            )}
            <Col className={"gutter-row"} span={24}>
                <Row gutter={[12, 12]} justify="end">
                    <Col className={"gutter-row"}>
                        <Buttons
                            styleType={"success"}
                            label={t("save")}
                            apiProgress={apiProgress}
                            onClick={onClickSave}/>
                    </Col>
                    <Col className={"gutter-row"}>
                        <Buttons
                            styleType={"danger"}
                            label={t("cancel")}
                            onClick={onChangeCancel}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UserEditForm;