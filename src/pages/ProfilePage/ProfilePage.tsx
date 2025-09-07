import { useState } from 'react'
import Button from '../../ui/Button/Button'
import './ProfilePage.scss'
import { logoutUser } from '../../api/User'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/QueryClient'
import { UserSettings } from '../../components/UserSettings/UserSettings'
import { FetchFavoritesFilms } from '../../components/FilmList/FetchFavoritesFilms'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../../store/authSlices'
import type { RootState } from '../../store/index'
import IconLike from '../../assets/icons/icon-like.svg'
import IconPerson from '../../assets/icons/icon-person.svg'
import SvgIcon from '../../ui/Svg/Svg'


function ProfilePage() {
    const user = useSelector((state: RootState) => state.auth.data)
    const [profileInfo, setProfileInfo] = useState<string>('favorites')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickSettings = () => {
        setProfileInfo('settings')
    }
    const handleClickFavorites = () => {
        setProfileInfo('favorites')
    }

    const logoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["users", "me"] })
            navigate('/')
            dispatch(clearUser())
        }
    }, queryClient)

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    return (
        <section className='profile'>
            <div className="container">
                <h2 className='profile__title'>Мой аккаунт</h2>
                {user ?
                    <div className='profile__wrapper'>
                        <div className="profile__menu">
                            <div className={`profile__buttons  ${profileInfo === 'favorites' ? 'profile__buttons--active' : ''} `}>
                                <SvgIcon className='profile__buttons-icon' icon={IconLike} width={24} height={24} />
                                <Button className='btn btn--bg-transparent profile__btn' onClick={handleClickFavorites}>Избранные фильмы</Button>
                                <Button className='btn btn--bg-transparent profile__btn profile__btn--mobile' onClick={handleClickFavorites}>Избранное</Button>
                            </div>
                            <div className={`profile__buttons  ${profileInfo === 'settings' ? 'profile__buttons--active' : ''} `}>
                                <SvgIcon className='profile__buttons-icon profile__buttons-icon--person' icon={IconPerson} width={24} height={24} />
                                <Button className='btn btn--bg-transparent profile__btn' onClick={handleClickSettings}>Настройки аккаунта</Button>
                                <Button className='btn btn--bg-transparent profile__btn  profile__btn--mobile' onClick={handleClickSettings}>Настройки</Button>
                            </div>
                        </div>
                        {profileInfo === 'settings' ?
                            <UserSettings user={user} onClick={handleLogout} />
                            :
                            <FetchFavoritesFilms />
                        }
                    </div> :
                    <p className='profile__text'>
                        Для просмотра данных аккаунта, пожалуйста авторизуйтесь!
                    </p>}

            </div>
        </section >
    )
}
export default ProfilePage