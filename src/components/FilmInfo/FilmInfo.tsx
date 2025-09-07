import type { Film } from '../../api/Films'
import './FilmInfo.scss'

interface TProps {
    film: Film
}
const FilmInfo = ({ film }: TProps) => {
    
    const formatCurrency = (value: number): string =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

    return (

        <div className="film-info">
            <h2 className='film-info__title'>О фильме</h2>
            <div className="film-info__inner">
                <div className="film-info__property">
                    <span className='film-info__property-name'>Язык оригинала</span>
                    <span className='film-info__property-value'>{film.language ? film.language.charAt(0).toUpperCase() + film.language.slice(1, film.language.length) : 'Данные отсутсвуют'}</span>
                </div>
                <div className="film-info__property">
                    <span className='film-info__property-name'>Бюджет</span>
                    <span className='film-info__property-value'>{film.budget ? formatCurrency(Number(film.budget)) : 'Данные отсутсвуют'}</span>
                </div>
                <div className="film-info__property">
                    <span className='film-info__property-name'>Выручка</span>
                    <span className='film-info__property-value'>{film.revenue ? formatCurrency(Number(film.revenue)) : 'Данные отсутсвуют'}</span>
                </div>
                <div className="film-info__property">
                    <span className='film-info__property-name'>Режиссёр</span>
                    <span className='film-info__property-value'>{film.director ? film.director : 'Данные отсутсвуют'}</span>
                </div>
                <div className="film-info__property">
                    <span className='film-info__property-name'>Продакшен</span>
                    <span className='film-info__property-value'>{film.production ? film.production : 'Данные отсутсвуют'}</span>
                </div>
                <div className="film-info__property">
                    <span className='film-info__property-name'>Награды</span>
                    <span className='film-info__property-value'>{film.awardsSummary ? film.awardsSummary : 'Данные отсутсвуют'}</span>
                </div>
            </div>
        </div>

    )


}

export default FilmInfo