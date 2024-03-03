import React, {useState} from "react";
import {usePropDispatch, usePropState} from "@/shared/context";
import {useTranslation} from "react-i18next";
import Buttons from "@/components/customButton/Buttons"
import ProfileImage from "@/components/header/ProfileImage.jsx";
import UserEditForm from "@/pages/ProfileCard/UserEditForm.jsx";

function ProfileCard(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const [isEdit, setIsEdit] = useState(false);

    const onHandlerEditMode = (event) => {
        setIsEdit(event);
    }

    const userUpdate = (data) => {
        props.isUpdated(data)
    }

    const isEditButtonVisible = !isEdit && (propState.id === props.user.id || (propState["isAdministrator"] ? propState["isAdministrator"] : false));
    return (
        <div className={"card"}>
            <div className={"card-image text-center"}>
                <ProfileImage style={{width: 200, height: 200}}/>
            </div>
            <div className={"card-body d-block text-center"}>
                {!isEdit && (<div className="fs-3 d-block"> {props.user.username}</div>)}
                {isEditButtonVisible && <Buttons onClick={() => setIsEdit(true)} label={t("edit")}/>}
                {isEdit && (
                    <UserEditForm
                        setEditMode={onHandlerEditMode}
                        user={props.user}
                        isUpdated={(data) => userUpdate(data)}/>)}
            </div>
        </div>
    );
}

export default ProfileCard;