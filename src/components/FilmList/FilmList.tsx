import { Link } from "react-router"
import { fetchDeleteFavoritesFilms, type FilmsList } from "../../api/Films"
import './FilmList.scss'
import Button from "../../ui/Button/Button"
import SvgIcon from "../../ui/Svg/Svg"
import IconClose from '../../assets/icons/icon-close.svg'
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../api/QueryClient"

interface TProps {
    films: FilmsList,
    isEdit?: boolean
    isNumbered?: boolean,
    isSlide?: boolean,
}

const FilmList = ({ films, isEdit, isNumbered, isSlide }: TProps) => {

    const deleteFilmMutation = useMutation({
        mutationFn: (id: number) => fetchDeleteFavoritesFilms(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        }
    }, queryClient)

    const handleDeleteFilmFormFavorites = (filmId: number) => {
        deleteFilmMutation.mutate(filmId)
    }
    return (
        <ul className={`films__list ${isNumbered ? 'films__list--number' : ''} ${isSlide ? 'films__list--slide' : ''}`} >
            {
                films.map((film) => (
                    film.posterUrl ?
                        <li key={film.id} className='films__item'>
                            <div className="films__card">
                                <Link className="films__card-link" to={`/films/${film.id}`}>
                                    <img className="films__card-image" src={film.posterUrl} alt="Постер фильма" />
                                </Link>
                                {isEdit === true ?
                                    <Button className="btn btn--icon films__card-btn" onClick={() => handleDeleteFilmFormFavorites(film.id)}><SvgIcon icon={IconClose} width={24} height={24} /></Button>
                                    : ''}
                            </div>
                        </li> :
                        <li className='films__item' key={film.id}>
                            <div className="films__card films__card--no-image">
                                <Link to={`/films/${film.id}`} className="films__card-link ">
                                    <span className="films__card-text">К сожалению,</span>
                                    <span className="films__card-text">постер</span>
                                    <span className="films__card-text">отсутствует</span>
                                </Link>
                                {isEdit === true ?
                                    <Button className="btn btn--icon films__card-btn" onClick={() => handleDeleteFilmFormFavorites(film.id)} > <SvgIcon icon={IconClose} width={24} height={24} /></Button>
                                    : ''}
                            </div>
                        </li>
                ))
            }
        </ul>
    )
}

export default FilmList