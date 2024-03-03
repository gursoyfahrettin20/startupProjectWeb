import React, {useEffect, useState} from 'react';
import FormItem from "@/components/formItem/FormItem.jsx";
import Alert from "@/components/alert/index.jsx";
import Buttons from "@/components/customButton/Buttons.jsx";
import {updateUser} from "@/api/apiCalls.js";
import {usePropDispatch, usePropState} from "@/shared/context.jsx";
import {useTranslation} from "react-i18next";
import {storeAuthState} from "@/shared/localStorage.js";
import _ from "lodash";

function UserEditForm(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const dispatch = usePropDispatch();
    const [newUsername, setNewUsername] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalErrors, setGeneralErrors] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        setNewUsername(props.user.username);
        props.isUpdated(false);
    }, [props.user.username]);

    const onChangeUsername = (event) => {
        setNewUsername(event.target.value);
        setErrors({});
    }

    const onClickSave = async () => {
        setApiProgress(true);
        setErrors({});
        setGeneralErrors();
        try {
            await updateUser(props.user.id, {username: newUsername});
            if (propState.id === props.user.id) {
                dispatch({type: "user-update-data", data: {username: newUsername}})
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
    }
    return (
        <>
            <FormItem
                name="Username"
                label={t("Username")}
                defaultValue={newUsername}
                errors={errors.username}
                onChange={onChangeUsername}
            />
            {
                generalErrors && (<Alert status={generalErrors} styleType={"danger"}/>)
            }
            <Buttons
                label={t("save")}
                apiProgress={apiProgress}
                onClick={onClickSave}/>
            <div className={"d-inline m-1"}></div>
            <Buttons
                label={t("cancel")}
                styleType={"outline-secondary"}
                onClick={onChangeCancel}
            />
        </>
    );
}

export default UserEditForm;