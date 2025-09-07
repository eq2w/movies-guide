import { useQuery } from '@tanstack/react-query'
import './GenresPage.scss'
import { fetchGenresFilms } from '../../api/Films'
import { queryClient } from '../../api/QueryClient'
import { Loader } from '../../components/Loader/Loader'
import GenreCard from '../../components/GenreCard/GenreCard'
import Button from '../../ui/Button/Button'

const GenresPage = () => {

    const genresQuery = useQuery({
        queryFn: () => fetchGenresFilms(),
        queryKey: ["genresFilms"],
        retry: 0,
    }, queryClient)

    switch (genresQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return (
                <section className='genres'>
                    <div className="container">
                        <h2 className="genres__title">Жанры фильмов</h2>
                        <ul className="genres__list">
                            {genresQuery.data.map((genre) => (
                                <li key={genre} className='genres__item'>
                                    <GenreCard genre={genre} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )
        case "error":
            return (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontSize: '24px', color: '#ffffff' }}>Ошибка загрузки</span>
                    <Button className="btn btn--error" onClick={genresQuery.refetch}>Повторить попытку</Button>
                </div>
            )

    }
}

export default GenresPage

