import React, {useContext, useState} from "react";
import {usePropState} from "@/shared/context";
import {useTranslation} from "react-i18next";
import defaultProfileImage from "@/assets/profile.png"
import Buttons from "@/components/customButton/Buttons"
import FormItem from "@/components/formItem/FormItem.jsx";
import {updateUser} from "@/api/apiCalls.js";

function ProfileCard(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const [isEdit, setIsEdit] = useState(false);
    const [newUsername, setNewUsername] = useState();
    const [apiProgress, setApiProgress] = useState(false);

    const onChangeUsername = (event) => {
        setNewUsername(event.target.value);
    }

    const onClickSave = async () => {
        setApiProgress(true);
        try {
            await updateUser(props.user.id, {username: newUsername})
        } catch (e) {

        } finally {
            setApiProgress(false);
        }
    }

    const isEditButtonVisible = !isEdit && (propState.id === props.user.id || (propState.isAdminstrator ? propState.isAdminstrator : false))
    return (
        <div className={"card"}>
            <div className={"card-image text-center"}>
                <img
                    className={"img-fluit rounded-circle shadow-sm"}
                    src={defaultProfileImage}
                    style={{width: 200, height: 200}}/>
            </div>
            <div className={"card-body d-block text-center"}>
                {
                    !isEdit && (
                        <div className="fs-3 d-block"> {props.user.username}</div>
                    )
                }
                {
                    isEditButtonVisible &&
                    <Buttons onClick={() => setIsEdit(true)} label={t("edit")}/>
                }
                {
                    isEdit && (
                        <>
                            <FormItem
                                name="Username"
                                label={t("Username")}
                                defaultValue={props.user.username}
                                // errors={errors.Username}
                                onChange={onChangeUsername}
                            />
                            <Buttons
                                label={t("save")}
                                apiProgress={apiProgress}
                                onClick={onClickSave}/>
                            <div className={"d-inline m-1"}></div>
                            <Buttons
                                label={t("cancel")}
                                styleType={"outline-secondary"}
                                onClick={() => setIsEdit(false)}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ProfileCard;