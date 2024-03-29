import {useCallback, useState} from "react";
import {propsReducer, usePropDispatch, usePropState} from "@/shared/context";
import {useTranslation} from "react-i18next";
import Buttons from "@/components/customButton/Buttons"
import ProfileImage from "@/components/header/ProfileImage.jsx";
import UserEditForm from "@/pages/ProfileCard/UserEditForm.jsx";
import {deleteUser} from "@/api/apiCalls.js";
import {useNavigate} from "react-router-dom";

function ProfileCard(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const dispatch = usePropDispatch();
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false);
    const [tempImage, setTempImage] = useState();
    const [apiProgress, setApiProgress] = useState(false);

    const onHandlerEditMode = (event) => {
        setIsEdit(event);
    }

    const userUpdate = (data) => {
        props.isUpdated(data)
    }

    const onClickDelete = useCallback(async () => {
        const result = confirm(" Eminmisin ? ")

        if (result) {
            setApiProgress(true);
            try {
                await deleteUser(props.user.id);
                if (propState.id === props.user.id) {
                    dispatch({type: "logout-success", data: {}});
                }
                navigate("/");
            } catch {

            } finally {
                setApiProgress(false);
            }
        }
    }, [props.user.id])

    const isEditButtonVisible = !isEdit && (propState.id === props.user.id || (propState["isAdministrator"] ? propState["isAdministrator"] : false));
    return (
        <div className={"card"}>
            {
                (propState["isAdministrator"] && propState.id === props.user.id) &&
                <span className="badge text-bg-warning"
                      style={{float: "right", margin: "10px 0"}}>{t("administrator")}</span>
            }
            {
                (!(propState["isAdministrator"] && propState.id === props.user.id) && (isEditButtonVisible || isEdit)) &&
                <div>
                    <Buttons
                        styleType={"danger"}
                        apiProgress={apiProgress}
                        style={{width: "100%", margin: "10px 0"}}
                        label={(propState.id === props.user.id) ? props.user.username + " " + t("delete") : t("deleteThisUser")}
                        onClick={onClickDelete}/>
                </div>
            }
            <div className={"card-image text-center"}>
                <ProfileImage style={{width: 200, height: 200}} tempImage={tempImage} image={props.user.image}/>
            </div>
            <div className={"card-body d-block text-center"}>
                {!isEdit && (<div className="fs-3 d-block"> {props.user.username}</div>)}
                {isEditButtonVisible &&
                    <Buttons styleType={"primary"} onClick={() => setIsEdit(true)} label={t("edit")}/>}
                {isEdit && (
                    <UserEditForm
                        setEditMode={onHandlerEditMode}
                        user={props.user}
                        isUpdated={(data) => userUpdate(data)}
                        setTempImage={setTempImage}
                    />)}
            </div>
        </div>
    );
}

export default ProfileCard;