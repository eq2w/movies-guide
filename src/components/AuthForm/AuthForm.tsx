import { useState } from "react";
import './AuthForm.scss'
import SvgIcon from "../../ui/Svg/Svg";
import IconLogo from '../../assets/icons/icon-logo-black.svg'
import { LoginForm } from "../LoginForm/LoginForm";
import Button from "../../ui/Button/Button";
import IconClose from '../../assets/icons/icon-close.svg'
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { closeAuth } from "../../store/authWindowSlices";
import type { RootState } from "../../store";


export const AuthForm = () => {
    const authOpen = useSelector((state: RootState) => state.authWindow)
    const [authType, setAuthType] = useState<string>("register");
    const [successRegister, setSuccessRegister] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleClick = () => {
        setAuthType((prevState) =>
            prevState === "register" ? "auth" : "register",
        );
        setSuccessRegister(false)
    };

    const handleRegisterSuccess = () => {
        setSuccessRegister(true)
    }
    const handleAuthClose = () => {
        dispatch(closeAuth())
        setAuthType('register')
    }
    if (!authOpen) return null

    return (
        <div className="auth-form">
            <div className="auth-form__wrapper">
                <SvgIcon className='auth-form__icon' icon={IconLogo} width={157} height={35} />
                {authType === "auth" ? <RegisterForm onSuccess={handleRegisterSuccess} onClick={handleClick} /> : <LoginForm onSuccess={handleAuthClose} />}


                {successRegister === true ?
                    <></> :
                    <Button className="  btn auth-form__button btn--bg-transparent" onClick={handleClick} type="button">
                        {authType === "auth" ? "У меня есть пароль" : "Регистрация"}
                    </Button>
                }

                <Button className="btn btn--icon auth-form__button-close" onClick={handleAuthClose} type="button">
                    <SvgIcon icon={IconClose} width={24} height={24} />
                </Button>
            </div>
        </div>
    );
}

