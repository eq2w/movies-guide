import { useParams } from 'react-router'
import './FilmPage.scss'
import { fetchFilmId } from '../../api/Films'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../api/QueryClient'
import Hero from '../../components/Hero/Hero'
import { Loader } from '../../components/Loader/Loader'
import FilmInfo from '../../components/FilmInfo/FilmInfo'

function FilmPage() {
    const { filmId } = useParams()

    const filmIdQuery = useQuery({
        queryFn: () => fetchFilmId(Number(filmId)),
        queryKey: ["film", filmId],
        retry: 0,
    }, queryClient)

    switch (filmIdQuery.status) {
        case "pending":
            return <Loader />
        case "success":
            return (
                <section className='about-film'>
                    <h2 className='visually-hidden'>Информация о фильме</h2>
                    <div className="container">
                        <div className='about-film__hero'>
                            <Hero className='hero' film={filmIdQuery.data} btnDisabled={true} />
                        </div>
                        <div className="about-film__info">
                            <FilmInfo film={filmIdQuery.data} />
                        </div>
                    </div>
                </section>
            )
        case "error":
            return <Loader />
    }
}




export default FilmPage