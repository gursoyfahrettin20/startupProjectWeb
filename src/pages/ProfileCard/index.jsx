import {useState} from "react";
import {usePropState} from "@/shared/context";
import {useTranslation} from "react-i18next";
import Buttons from "@/components/customButton/Buttons"
import ProfileImage from "@/components/header/ProfileImage.jsx";
import UserEditForm from "@/pages/ProfileCard/UserEditForm.jsx";

function ProfileCard(props) {
    const {t} = useTranslation();
    const propState = usePropState();
    const [isEdit, setIsEdit] = useState(false);
    const [tempImage, setTempImage] = useState();

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
                <ProfileImage style={{width: 200, height: 200}} tempImage={tempImage} image={props.user.image}/>
            </div>
            <div className={"card-body d-block text-center"}>
                {!isEdit && (<div className="fs-3 d-block"> {props.user.username}</div>)}
                {isEditButtonVisible && <Buttons onClick={() => setIsEdit(true)} label={t("edit")}/>}
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