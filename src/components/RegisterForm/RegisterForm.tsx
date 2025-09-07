import SvgIcon from "../../ui/Svg/Svg"
import { FormField } from "../FormField/FormField"
import "./RegisterForm.scss"
import IconEmail from '../../assets/icons/icon-email.svg'
import IconPassword from '../../assets/icons/icon-password.svg'
import IconPerson from '../../assets/icons/icon-person.svg'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from "../../ui/Button/Button"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../../api/User"
import { queryClient } from "../../api/QueryClient"
import { useEffect } from "react"


const CreateRegisterSchema = z.object({
    email: z.string().email('Неверный формат электронной почты'),
    password: z.string().min(5, 'Минимальная длина пароля 5 символов'),
    confirmPassword: z.string().min(5, 'Минимальная длина пароля 5 символов'),
    name: z.string().min(3, 'Минимальная длина имени 3 символа'),
    surname: z.string().min(3, 'Минимальная длина имени 3 символа'),

}).
    refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ["confirmPassword"],
    })
type CreateRegisterFrom = z.infer<typeof CreateRegisterSchema>

type TProps = {
    onSuccess: () => void;
    onClick: () => void
}

export const RegisterForm = ({ onSuccess, onClick }: TProps) => {
    const {
        register, handleSubmit, formState: { errors }, reset
    } = useForm<CreateRegisterFrom>({ resolver: zodResolver(CreateRegisterSchema) })

    const registerMutation = useMutation({
        mutationFn: (data: { email: string, password: string, name: string, surname: string }) => registerUser(data.email, data.password, data.name, data.surname)
    }, queryClient)

    useEffect(() => {
        if (registerMutation.isSuccess) {
            onSuccess()
        }
    })

    if (registerMutation.isSuccess) {
        return (
            <div className="register-form__success">
                <p className="register-form__success-title">Регистрация завершена</p>
                <p className="register-form__success-text">Используйте вашу электронную почту для входа</p>
                <Button className="btn btn--second register-form__success-button" type="button" onClick={onClick}>Войти</Button>
            </div>)
    } else {
        return (
            <>
                <p className="register-form__title">Регистрация</p>
                <form className="register-form" onSubmit={handleSubmit(({ email, password, name, surname }) => {
                    registerMutation.mutate({ email, password, name, surname })
                    reset({ email: '', password: '', name: '', surname: '', confirmPassword: '' })
                })} >
                    <FormField className="register-form__label" errorMessage={errors.email?.message}>
                        <SvgIcon className="register-form__icon" width={24} height={24} icon={IconEmail} />
                        <input className="register-form__input" placeholder="Электронная почта" autoComplete="true" {...register('email')} />
                    </FormField>
                    <FormField className="register-form__label" errorMessage={errors.name?.message}>
                        <SvgIcon className="register-form__icon" width={24} height={24} icon={IconPerson} />
                        <input className="register-form__input" placeholder="Имя" type="text"  {...register('name')} />
                    </FormField>
                    <FormField className="register-form__label" errorMessage={errors.surname?.message}>
                        <SvgIcon className="register-form__icon" width={24} height={24} icon={IconPerson} />
                        <input className="register-form__input" placeholder="Фамилия" type="text" {...register('surname')} />
                    </FormField>
                    <FormField className="register-form__label" errorMessage={errors.password?.message}>
                        <SvgIcon className="register-form__icon" width={24} height={24} icon={IconPassword} />
                        <input className="register-form__input" placeholder="Пароль" type="password"  {...register('password')} />
                    </FormField>
                    <FormField className="register-form__label" errorMessage={errors.confirmPassword?.message}>
                        <SvgIcon className="register-form__icon" width={24} height={24} icon={IconPassword} />
                        <input className="register-form__input" placeholder="Подтвердите пароль" type="password" {...register('confirmPassword')} />
                    </FormField>
                    {registerMutation.error && <span className="register-form__error">{registerMutation.error.message}</span>}
                    <Button className="btn btn--second register-form__button" type="submit">Создать аккаунт</Button>
                </form>
            </>
        )
    }
}