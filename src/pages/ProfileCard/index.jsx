import defaultProfileImage from "@/assets/profile.png"

function ProfileCard(props) {
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
            </div>
        </div>
    );
}

export default ProfileCard;