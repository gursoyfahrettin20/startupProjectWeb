import defaultProfileImage from "@/assets/profileDefaultImage.png";

function ProfileImage(props) {
    const profileImage = props ? (props.image ? `/assets/profile/${props.image}` : defaultProfileImage) : defaultProfileImage;
    return (
        <img
            className={props.className ? props.className : "img-fluit rounded-circle shadow-sm"}
            src={props.tempImage || profileImage}
            style={props.style ? props.style : {width: 20, height: 20}}
            onError={({target}) => {
                target.src = defaultProfileImage
            }}
        />
    );
}

export default ProfileImage;