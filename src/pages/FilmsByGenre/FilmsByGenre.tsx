import './FilmsByGenre.scss'
import FetchFilmsByGenre from '../../components/FilmList/FetchFilmByGenre'
import { Link, useParams } from 'react-router'
import Button from '../../ui/Button/Button'
import { useState } from 'react'
import IconArrow from '../../assets/icons/icon-arrow.svg'
import SvgIcon from '../../ui/Svg/Svg'

const FilmsByGenre = () => {
    const { genreId } = useParams()
    const [pages, setPages] = useState([0])
    const [hasMore, setHasMore] = useState(true)
    const handleAddFilms = () => {
        setPages(prev => [...prev, prev.length])
    }
    const handleEndReached = () => {
        setHasMore(false)
    }
    return (
        <section className='films-genre'>
            <div className="container">
                <div className="films-genre__menu">
                    <Link className='films-genre__link' to={'/genres'}><SvgIcon icon={IconArrow} width={40} height={40} /></Link>
                    <h2 className='films-genre__title'>{genreId?.charAt(0).toUpperCase()}{genreId?.slice(1, genreId.length)}</h2>
                </div>
                <div className='films-genre__list'>
                    {pages.map((page) => (
                        <FetchFilmsByGenre key={page} count={10} page={page} onReached={handleEndReached} />

                    ))}
                </div>
                <Button isDisabled={hasMore === false ? true : false} onClick={handleAddFilms} className={`btn btn--second films-genre__button`}>Показать ещё</Button>
            </div>
        </section >
    )
}

export default FilmsByGenre