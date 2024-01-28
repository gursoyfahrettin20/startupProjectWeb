import React from 'react';
import defaultPicture from "../../assets/profile.png";

const ProfileImageWithDefault = (props) => {
    const {user, style, className, tempImg} = props;
    let imageSource = defaultPicture;
    if (user.image) {
        imageSource = "images/" + user.image;
    }
    return (
        <>
            <img
                className={"rounded-circle " + className}
                src={tempImg || imageSource}
                image={user.image}
                alt={user ? user.displayName + ` profile` : "no-user"}
                title={user ? user.username + ` profile` : "no-user"}
                style={style}
                onError={(event) => {
                    event.target.src = defaultPicture
                }}
            />
        </>
    );
};

export default ProfileImageWithDefault;