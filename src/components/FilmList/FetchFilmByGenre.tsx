import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchFilmsbyFilter } from '../../api/Films'
import FilmList from './FilmList'
import { Loader } from '../Loader/Loader'
import { useEffect } from 'react'
import { QueryError } from '../QueryError/QueryError'

interface TProps {
    count: number,
    page: number,
    onReached?: () => void,
}

const FetchFilmsByGenre = ({ count, page, onReached }: TProps) => {
    const { genreId } = useParams()

    const filmsByGenreQuery = useQuery({
        queryFn: () => fetchFilmsbyFilter(String(genreId), count, '', page),
        queryKey: [`filmsBy${genreId}`, { page }],
        retry: 0,
    })
    useEffect(() => {
        if (filmsByGenreQuery.status === 'success' && filmsByGenreQuery.data.length < count && onReached) {
            onReached()
        }
    }, [filmsByGenreQuery.status, filmsByGenreQuery.data?.length])
    
    switch (filmsByGenreQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return <FilmList films={filmsByGenreQuery.data} />
        case "error":
            return <QueryError onRetry={filmsByGenreQuery.refetch}/>
    }
}

export default FetchFilmsByGenre