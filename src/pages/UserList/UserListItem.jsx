import defaultProfileImage from "@/assets/profile.png"
import { v5 as uuIdv5 } from 'uuid';
function UserListItem({user}) {
    return (
        <li className={"list-group-item list-group-item-action"}>
            <img
                className={"img-fluit rounded-circle shadow-sm"}
                src={defaultProfileImage}
                style={{width: 30, height: 30}}/>
            <span className="ms-2">
                {user.username}
            </span>
        </li>
    );
}

export default UserListItem;