import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "@/api/apiCalls.js";
import  ProfileCard  from "@/pages/ProfileCard";

function User() {
    const { id } = useParams();
    const [userState, setUserState] = useState(null);
    const [apiProgress, setApiProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        getUserDetail();
    }, [id]);

    return (
        <>
            {apiProgress && (
                <span className="spinner-border" aria-hidden="true"></span>
            )}

            
            {userState && <ProfileCard user={userState} />}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        </>
    );
}

export default User;
