import Button from "../../ui/Button/Button"
import './QueryError.scss'

type Props = {
    onRetry: () => void
    compact?: boolean
}
export const QueryError = ({ onRetry, compact = false }: Props) => {
    return (
        <div className={`query-error ${compact ? 'query-error--compact' : ''}`}>
            <span className={'query-error__text'}>Ошибка загрузки</span>
            <Button className="btn btn--error" onClick={onRetry}>Повторить попытку</Button>
        </div>
    )
}