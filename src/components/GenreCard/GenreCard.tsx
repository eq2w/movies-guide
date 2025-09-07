import { useQuery } from '@tanstack/react-query'
import { fetchFilmsbyFilter } from '../../api/Films'
import './GenreCard.scss'
import { queryClient } from '../../api/QueryClient'
import { Loader } from '../Loader/Loader'
import { Link } from 'react-router'

type TProps = {
    genre: string
}
const GenreCard = ({ genre }: TProps) => {

    const imageQuery = useQuery({
        queryFn: () => fetchFilmsbyFilter(genre, 5, '', 1),
        queryKey: [`genresImage${genre}`],
        retry: 0,
    }, queryClient)
    
    const index = Math.floor(Math.random() * 5)

    switch (imageQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return (
                <Link className='genre-card' to={`/genres/${genre}`}>
                    {imageQuery.data[index].posterUrl ?
                        <>
                            <img className='genre-card__image' src={imageQuery.data[index].posterUrl} alt="Постер жанра" />
                            <span className='genre-card__title'>{genre.charAt(0).toUpperCase() + genre.slice(1, genre.length)}</span>
                        </>
                        : <>
                            <div className='genre-card__image genre-card__image--no-image'>
                                <span className='genre-card__text'>К сожалению,</span>
                                <span className='genre-card__text'>постер</span>
                                <span className='genre-card__text'>отсутствует</span>
                            </div>
                            <span className='genre-card__title'>{genre}</span></>}
                </Link>
            )
        case "error":
            return <Loader />
    }
}

export default GenreCard