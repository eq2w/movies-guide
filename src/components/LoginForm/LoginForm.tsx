import SvgIcon from "../../ui/Svg/Svg"
import { FormField } from "../FormField/FormField"
import "./LoginForm.scss"
import IconEmail from '../../assets/icons/icon-email.svg'
import IconPassword from '../../assets/icons/icon-password.svg'
import Button from "../../ui/Button/Button"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../api/User"
import { queryClient } from "../../api/QueryClient"


const CreateLoginSchema = z.object({
    email: z.string().email('Неверный формат электронной почты'),
    password: z.string().min(5, 'Минимальная длина пароля 5 символов')
})

type CreateLoginForm = z.infer<typeof CreateLoginSchema>

type TProps = {
    onSuccess: () => void
}
export const LoginForm = ({ onSuccess }: TProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateLoginForm>({
        resolver: zodResolver(CreateLoginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (data: { email: string, password: string }) => loginUser(data.email, data.password),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
            onSuccess()
        }
    }, queryClient)


    return (
        <form className="login-form" onSubmit={handleSubmit(({ email, password }) => {
            loginMutation.mutate({ email, password })
        })}>
            <FormField className="login-form__label" errorMessage={errors.email?.message}>
                <SvgIcon className="login-form__icon" width={24} height={24} icon={IconEmail} />
                <input className="login-form__input" placeholder="Электронная почта" autoComplete="true" {...register('email')} />
            </FormField>
            <FormField className="login-form__label" errorMessage={errors.password?.message}>
                <SvgIcon className="login-form__icon" width={24} height={24} icon={IconPassword} />
                <input className="login-form__input" placeholder="Пароль" type="password"  {...register('password')} />
            </FormField>
            {loginMutation.error && <span className="login-form__error">{loginMutation.error.message}</span>}
            <Button className="btn btn--second login-form__button" type="submit">Войти</Button>
        </form>

    )
}