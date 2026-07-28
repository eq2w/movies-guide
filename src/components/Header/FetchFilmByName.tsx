import { useQuery } from '@tanstack/react-query'
import { fetchFilmsbyFilter } from '../../api/Films'
import { Loader } from '../Loader/Loader'
import { Link } from 'react-router'
import Hero from '../Hero/Hero'
import { QueryError } from '../QueryError/QueryError'


interface TProps {
    name: string,
    onClick: () => void,
}

const FetchFilmsByName = ({ name, onClick }: TProps) => {

    const filmsByNameQuery = useQuery({
        queryFn: () => fetchFilmsbyFilter('', 5, name, 0),
        queryKey: [`filmsByName`, name],
        retry: 0,
        enabled: name !== '',
    })

    switch (filmsByNameQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return (
                <ul className='header__search-list'>
                    {filmsByNameQuery.data.map((film) => (
                        <li key={film.id} className='header__search-item'>
                            <Link onClick={onClick} to={`/films/${film.id}`}>
                                <Hero className='hero hero--flat' film={film} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )
        case "error":
            return <QueryError onRetry={filmsByNameQuery.refetch} compact={true} />
    }
}


export default FetchFilmsByName