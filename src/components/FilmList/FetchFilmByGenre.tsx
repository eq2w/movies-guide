import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchFilmsbyFilter } from '../../api/Films'
import FilmList from './FilmList'
import { Loader } from '../Loader/Loader'
import { useEffect } from 'react'
import Button from '../../ui/Button/Button'

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
    })
    switch (filmsByGenreQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return <FilmList films={filmsByGenreQuery.data} />
        case "error":
            return (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontSize: '24px', color: '#ffffff' }}>Ошибка загрузки</span>
                    <Button className="btn btn--error" onClick={filmsByGenreQuery.refetch}>Повторить попытку</Button>
                </div>
            )
    }
}

export default FetchFilmsByGenre