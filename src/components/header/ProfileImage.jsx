import React from 'react';
import defaultProfileImage from "@/assets/profileDefaultImage.png";

function ProfileImage(props) {
    return (
        <img
            className={props.className ? props.className : "img-fluit rounded-circle shadow-sm"}
            src={props.image ? props.image : defaultProfileImage}
            style={props.style ? props.style : {width: 20, height: 20}}/>
    );
}

export default ProfileImage;