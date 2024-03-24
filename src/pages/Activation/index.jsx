import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "@/api/apiCalls.js";
import Alert from "@/components/alert/index.jsx";

export function Activation() {
    const { token } = useParams();
    const [apiProgress, setApiProgress] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        async function activate() {
            setApiProgress(true);
            try {
                const response = await activateUser(token);
                setSuccessMessage(response.data.message);
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }
        activate().then();
    }, [token])

    return (
        <>
            {apiProgress && (
                <span className="spinner-border" aria-hidden={true}></span>
            )}
            {
                successMessage && (<Alert status={successMessage} styleType={"success"} center={true} />)
            }
            {
                errorMessage && (<Alert status={errorMessage} styleType={"danger"} center={true} />)
            }
        </>
    );
}
