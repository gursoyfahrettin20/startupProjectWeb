import {useState, useEffect} from 'react';
import {FormItem} from "@/components/formItem/FormItem";
import {useTranslation} from "react-i18next";
import Alert from "@/components/alert";
import Buttons from "@/components/customButton/Buttons"
import {Login} from '@/api/apiCalls';
import {usePropDispatch} from '@/shared/context';
import {useNavigate} from 'react-router-dom';

function Index() {
    const {t} = useTranslation();
    const dispatch = usePropDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalErrors, setGeneralErrors] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        setErrors((lastErrors) => {
            return {...lastErrors, email: undefined}
        })
        setGeneralErrors(null)
    }, [email])

    useEffect(() => {
        setErrors((lastErrors) => {
            return {...lastErrors, password: undefined}
        })
        setGeneralErrors(null)
    }, [password])

    const onSubmit = async (event) => {
        event.preventDefault();
        setGeneralErrors();
        setApiProgress(true);

        const data = {
            email: email,
            password: password
        };
        try {
            const response = await Login(data);
            dispatch({type: "login-success", data: response.data});
            navigate("/");
            setPassword();
            setEmail();
        } catch (responseError) {
            if (responseError.response?.data) {
                if (responseError.response?.data.status === 400) {
                    setErrors(responseError.response?.data["validationErrors"])
                } else {
                    setGeneralErrors(responseError.response?.data.message)
                }
            } else {
                setGeneralErrors("Tahmin Edilemeyen Hatalarda gösterilecektir. / Unexpected error occured. Pleace try again.");
            }
        } finally {
            setApiProgress(false);
        }
    }

    return (
        <div className='container'>
            <form className='card col-lg-6 offset-lg-3' onSubmit={onSubmit}>
                <div className='col-lg-12'>
                    <div className='text-center card-header'>
                        <h1>{t("login")}</h1>
                    </div>
                    <div className='card-body col-lg-12'>
                        <FormItem
                            name="email"
                            label={t("email")}
                            errors={errors.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormItem
                            name="password"
                            label={t("password")}
                            errors={errors.password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            generalErrors && (<Alert status={generalErrors} styleType={"danger"}/>)
                        }
                        {/*  {
                            successMessage && (<Alert status={successMessage} styleType={"success"} />)
                        } */}

                        <div className='text-center'>
                            <Buttons
                                className={"btn btn-primary"}
                                apiProgress={apiProgress}
                                label={t("Login")}
                                disabled={apiProgress}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Index
