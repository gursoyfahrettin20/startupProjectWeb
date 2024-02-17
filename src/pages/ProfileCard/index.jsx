import React, { useContext } from "react";
import { useAuthState } from "@/shared/context";
import { useTranslation } from "react-i18next";
import defaultProfileImage from "@/assets/profile.png"
import Button from "@/components/customButton"

function ProfileCard(props) {
    const { t } = useTranslation();
    const authState = useAuthState();

    return (
        <div className={"card"}>
            <div className={"card-image text-center"}>
                <img
                    className={"img-fluit rounded-circle shadow-sm"}
                    src={defaultProfileImage}
                    style={{ width: 200, height: 200 }} />
            </div>
            <div className={"card-body text-center"}>
                <div className="fs-3"> {props.user.username}</div>
                {
                    authState.id === props.user.id && <Button label={t("edit")}/>
                }
            </div>
        </div>
    );
}

export default ProfileCard;