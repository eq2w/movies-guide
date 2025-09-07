import type { User } from '../../api/User'
import Button from '../../ui/Button/Button'
import './UserSettings.scss'
import IconEmail from '../../assets/icons/icon-email.svg'
import SvgIcon from '../../ui/Svg/Svg'

type TProps = {
    user: User,
    onClick: () => void,
}
export const UserSettings = ({ user, onClick }: TProps) => {
    return (
        <div className='user'>
            <div className="user__info">
                <div className='user__property'>
                    <span className='user__property-icon'>{user?.name.charAt(0).toUpperCase()}{user?.surname.charAt(0).toUpperCase()}</span>
                    <div className="user__property-name">
                        <span className='user__property-tag'>Имя Фамилия</span>
                        <p className='user__property-name'>{`${user?.name} ${user?.surname}`} </p>
                    </div>
                </div>
                <div className="user__property">
                    <SvgIcon className='user__property-icon user__property-icon--icon' icon={IconEmail} width={24} height={24} />
                    <div className="user__property-name">
                        <span className='user__property-tag'>Электронная почта</span>
                        <p className='user__property-name'>{user?.email} </p>
                    </div>
                </div>
            </div>
            <Button className='btn btn--second user__btn' onClick={onClick}>Выйти из аккаунта</Button>
        </div>
    )
}