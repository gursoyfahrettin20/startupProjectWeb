import ProfileImage from "@/components/Image/ProfileImage.jsx";
function UserListItem({user}) {
    return (
        <li className={"list-group-item list-group-item-action"}>
            <ProfileImage style={{width: 30, height: 30}} image={user.image}/>
            <span className="ms-2">
                {user.username}
            </span>
        </li>
    );
}

export default UserListItem;