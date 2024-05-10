import React from 'react';
import { usePasswordResetRequest } from "./usePasswordResetRequest";
import Alert from "@/components/alert/index";
import Buttons from "@/components/customButton/Buttons.jsx";
import FormItem from "@/components/formItem/FormItem.jsx";
import {useTranslation} from "react-i18next";

function Index(props) {
    const {t} = useTranslation();
    const {onSubmit, onChangeEmail, apiProgress, success, error, generalError} = usePasswordResetRequest();
    return (
        <div className="container">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
                <form className="card" onSubmit={onSubmit}>
                    <div className="card-header text-center">
                        <h1>{t("setYourPassword")}</h1>
                    </div>
                    <div className="card-body">
                        <FormItem
                            name="email"
                            label={t("email")}
                            errors={error}
                            onChange={onChangeEmail}
                        />
                        {success && (
                            <Alert>{success}</Alert>
                        )}
                        {generalError && (
                            <Alert styleType="danger">{generalError}</Alert>
                        )}
                        <div className="text-center">
                            <Buttons
                                className={"btn btn-primary"}
                                apiProgress={apiProgress}
                                label={t("reset")}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Index;