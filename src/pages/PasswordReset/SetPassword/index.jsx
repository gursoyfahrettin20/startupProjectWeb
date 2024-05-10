import React from 'react';
import Alert from "@/components/alert/index";
import Buttons from "@/components/customButton/Buttons";
import FormItem from "@/components/formItem/FormItem";
import {useSetPassword} from "./useSetPassword.js";
import {useTranslation} from "react-i18next";

export function Index(props) {
    const {t} = useTranslation();
    const {
        apiProgress,
        errors,
        generalErrors,
        success,
        onChangePassword,
        onChangePasswordRepeat,
        onSubmit,
        disabled
    } = useSetPassword();
    return (
        <div className='container'>
            <form className='card col-lg-6 offset-lg-3' onSubmit={onSubmit}>
                <div className='col-lg-12'>
                    <div className='text-center card-header'>
                        <h1>{t("setYourPassword")}</h1>
                    </div>
                    <div className='card-body col-lg-12'>
                        <FormItem
                            name="password"
                            label={t("password")}
                            errors={errors.password}
                            type="password"
                            onChange={onChangePassword}
                        />
                        <FormItem
                            name="passwordRepeat"
                            label={t("passwordRepeat")}
                            errors={errors.passwordRepeat}
                            type="password"
                            onChange={onChangePasswordRepeat}
                        />
                        {
                            generalErrors && (<Alert status={generalErrors} styleType={"danger"}/>)
                        }
                        {
                            success && (<Alert status={success} styleType={"success"}/>)
                        }

                        <div className='text-center'>
                            <Buttons
                                className={"btn btn-primary"}
                                apiProgress={apiProgress}
                                label={t("resetPassword")}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Index;