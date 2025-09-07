import './Hero.scss'
import IconStar from '../../assets/icons/icon-star.svg'
import Button from "../../ui/Button/Button"
import IconLike from '../../assets/icons/icon-like.svg'
import IconRefresh from '../../assets/icons/icon-refresh.svg'
import SvgIcon from "../../ui/Svg/Svg"
import { queryClient } from "../../api/QueryClient"
import { fetchDeleteFavoritesFilms, fetchFavoritesFilms, type Film } from '../../api/Films'
import { Link } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addFilmToFavorites } from '../../api/User'
import { useDispatch, useSelector } from 'react-redux'
import { openAuth } from '../../store/authWindowSlices'
import type { RootState } from '../../store/index'
import { openTrailer, setUrlTrailer } from '../../store/trailerWindowSlices'

interface TProps {
    film: Film
    btnDisabled?: boolean
    className: 'hero' | 'hero hero--flat',
}

const Hero = ({ film, btnDisabled, className }: TProps) => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ["randomFilm"] })
    }

    const addFilmtoFavoritesMutation = useMutation({
        mutationFn: (data: { id: string }) => addFilmToFavorites(data.id),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        }
    }, queryClient)

    const deleteFilmMutation = useMutation({
        mutationFn: (id: number) => fetchDeleteFavoritesFilms(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        }
    }, queryClient)

    const favoritesFilmsQuery = useQuery({
        queryFn: () => fetchFavoritesFilms(),
        queryKey: ['favorites'],
        retry: 0,
        enabled: auth.data !== null,
    }, queryClient)


    const handleAddToFavorites = (id: string) => {
        if (auth.data !== null) {
            if (favoritesFilmsQuery.data?.some(favorite => favorite.id === Number(id))) {
                deleteFilmMutation.mutate(Number(id))
            } else {
                addFilmtoFavoritesMutation.mutate({ id })
            }
        } else {
            dispatch(openAuth())
        }
    }
    const handleOpenTrailer = (url: string) => {
        dispatch(openTrailer())
        dispatch(setUrlTrailer(url.split('v=')[1]))
    }
    return (
        <div className={className}>
            <div className="hero__inner">
                <div className="hero__info">
                    <div className="hero__tags">
                        <span className={`hero__rating 
                                ${Number(film.tmdbRating) >= 8 ? 'hero__rating--gold' :
                                Number(film.tmdbRating) >= 7 ? 'hero__rating--green' :
                                    Number(film.tmdbRating) >= 5 ? 'hero__rating--grey' : ''}
                               `}>
                            <SvgIcon width={16} height={16} icon={IconStar} />
                            {film.tmdbRating?.toFixed(1)}</span>
                        <span className="hero__year">{film.releaseYear}</span>
                        <span className="hero__genre">{film.genres.map((genre, index) => (
                            index === 0 ? genre : ', ' + genre))}</span>
                        <span className="hero__runtime">{Math.floor(film.runtime / 60)} ч {film.runtime % 60} мин</span>
                    </div>
                    <h2 className="hero__title">{film.title}</h2>
                    <p className="hero__description">{film.plot}</p>
                </div>
                {className !== 'hero hero--flat' ?
                    <div className={`hero__buttons ${btnDisabled === true ? 'hero__buttons--line' : ''}`}>
                        <Button className="btn btn--second hero__button hero__button--second" type="button" onClick={() => handleOpenTrailer(film.trailerUrl)}>Трейлер</Button>
                        <Link className={`btn ${btnDisabled === true ? 'visually-hidden' : ''}`} type="button" to={`/films/${film.id}`}>О фильме</Link>
                        <Button className={`btn btn--icon hero__button ${favoritesFilmsQuery.data?.some(favorite => favorite.id === film.id) ? 'btn--active' : ''}`} onClick={() => handleAddToFavorites(String(film.id))} ariaLabel='Добавить в избранное' children={<SvgIcon className='btn__icon btn__icon--like' width={24} height={24} icon={IconLike} />} type="button" />
                        <Button className={`btn btn--icon hero__button ${btnDisabled === true ? 'visually-hidden' : ''}`} onClick={handleRefresh} children={<SvgIcon className="btn__icon" width={24} height={24} icon={IconRefresh} />} ariaLabel='Обновить фильм' type="button" />
                    </div>
                    : null
                }
            </div>
            {film.posterUrl ?
                <img className="hero__image" src={film.posterUrl} width={680} height={552} alt="Постер фильма" /> :
                <div className='hero__image hero__image--no-image'>
                    <span className='hero__image-text'>К сожалению,</span>
                    <span className='hero__image-text'>постер</span>
                    <span className='hero__image-text'>отсутствует</span>
                </div>}
        </div>
    )
}


export default Hero