import './header.scss'
import TextField from '../../ui/TextField/TextField'
import IconLogo from '../../assets/icons/icon-logo.svg'
import SvgIcon from '../../ui/Svg/Svg'
import Button from '../../ui/Button/Button'
import { NavLink } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { openAuth } from '../../store/authWindowSlices'
import { useState } from 'react'
import IconSearch from '../../assets/icons/icon-search.svg'
import FetchFilmsByName from './FetchFilmByName'
import type { RootState } from '../../store/index'
import IconPerson from '../../assets/icons/icon-person.svg'
import IconGenres from '../../assets/icons/icon-genres.svg'
import IconClose from '../../assets/icons/icon-close.svg'

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.data)
    const dispatch = useDispatch()
    const handleAuthOpen = () => {
        dispatch(openAuth())
    }
    const [searchInput, setSeacrhInput] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const handleSearhInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeacrhInput(e.target.value)
    }
    const handleClickToResultSearch = () => {
        setSeacrhInput('')
        setIsSearchOpen(false)
    }

    const handleOpenSearch = () => {
        setIsSearchOpen(true)
    }
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <NavLink className='header__logo' to={"/"} aria-label='Перейти на главную'>
                            <SvgIcon className='header__icon' width={144} height={32} icon={IconLogo} />
                        </NavLink>
                        <div className="header__inner">
                            <div className="header__nav">
                                <NavLink className={({ isActive }) => "header__nav-link" + (isActive ? " header__nav-link--active" : "")} to={"/"}>Главная</NavLink>
                                <NavLink className={({ isActive }) => "header__nav-link" + (isActive ? " header__nav-link--active" : "")} to={"/genres"}>Жанры</NavLink>
                                <NavLink className={({ isActive }) => "header__nav-link header__nav-link--genres" + (isActive ? " header__nav-link--active" : "")} to={"/genres"}>
                                    <SvgIcon icon={IconGenres} width={24} height={24} />
                                </NavLink>
                            </div>
                            <div className={`header__custom-input ${isSearchOpen ? 'header__custom-input--open' : ''}`} >
                                <Button onClick={handleOpenSearch} className='header__search-icon' ariaLabel='Поиск фильмов'><SvgIcon icon={IconSearch} width={24} height={24} /></Button>
                                <TextField className='header__search' placeholder='Поиск' value={searchInput ?? ''} onChange={handleSearhInput} />
                                <Button className='header__search-icon header__search-icon--close' onClick={handleClickToResultSearch} ariaLabel='Закрыть поиск фильмов'><SvgIcon icon={IconClose} width={24} height={24} /></Button>
                                <div className={`header__search-result ${searchInput ? 'header__search-result--open' : ''}`}>
                                    <FetchFilmsByName onClick={handleClickToResultSearch} name={searchInput ? searchInput : ''} />
                                </div>
                            </div>
                        </div>
                        {user ? <>
                            <NavLink className={({ isActive }) => "header__nav-link" + (isActive ? " header__nav-link--active" : "")} to={'/profile'}>{user.name}</NavLink>
                            <NavLink className='header__nav-link header__nav-link--profile' to={'/profile'}><SvgIcon icon={IconPerson} width={24} height={24} /></NavLink>
                        </>
                            :
                            <>
                                <Button className='header__btn' onClick={handleAuthOpen}>Войти</Button>
                                <Button className='header__btn header__btn--icon' onClick={handleAuthOpen} ariaLabel='Профиль'>
                                    <SvgIcon icon={IconPerson} width={24} height={24} />
                                </Button>
                            </>}
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header