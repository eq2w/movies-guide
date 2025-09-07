import { FetchHero } from "../../components/Hero/FetchRandomHero"
import { FetchTop } from "../../components/FilmList/FetchTopFilms"
import './MainPage.scss'

function MainPage() {
    return (
        <>
            <section className="random-film">
                <h2 className="visually-hidden">Рандомный фильм</h2>
                <div className="container">
                    <FetchHero />
                </div>
            </section>
            <section className="top10">
                <div className="container">
                    <h2 className="top10__title">Топ 10 фильмов</h2>
                    <FetchTop />
                </div >
            </section>
        </>
    )
}

export default MainPage