import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUser} from "@/api/apiCalls.js";
import ProfileCard from "@/pages/ProfileCard";

function User() {
    const {id, username} = useParams();
    const [userState, setUserState] = useState(null);
    const [apiProgress, setApiProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const getUserDetail = async () => {
            setApiProgress(true);
            try {
                const response = await getUser(id);
                setUserState(response.data);
            } catch (error) {
                setErrorMessage(error.response.data.message);
            } finally {
                setApiProgress(false);
            }
        };
        getUserDetail().then();
    }, [id, username, isUpdated]);

    const userUpdate = (data) => {
        setIsUpdated(data)
    }

    return (
        <>
            {apiProgress && (
                <span className="spinner-border" aria-hidden="true"></span>
            )}

            {userState && <ProfileCard user={userState} isUpdated={(data) => userUpdate(data)}/>}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        </>
    );
}

export default User;
