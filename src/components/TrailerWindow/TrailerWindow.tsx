import { useDispatch, useSelector } from 'react-redux'
import './TrailerWindow.scss'
import type { RootState } from '../../store'
import Button from '../../ui/Button/Button'
import SvgIcon from '../../ui/Svg/Svg'
import IconClose from '../../assets/icons/icon-close.svg'
import { closeTrailer } from '../../store/trailerWindowSlices'
import { Loader } from '../Loader/Loader'
import { useState } from 'react'

const TrailerWindow = () => {
    const trailerWindow = useSelector((state: RootState) => state.trailerWindow)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const handleTrailerWindowClose = () => {
        dispatch(closeTrailer())
        setLoading(true)
    }

    if (trailerWindow.isOpen !== true) return null

    return (
        <div className='trailer'>
            <div className='trailer__window'>
                {loading && <div className='trailer__loader'><Loader /></div>}
                <iframe src={`https://youtube.com/embed/${trailerWindow.url}?mute=1&autoplay=1&controls=1`}
                    frameBorder='0'
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                    width='100%'
                    height='100%'
                    onLoad={() => setLoading(false)}
                >
                </iframe>
                <Button className="btn btn--icon trailer__button-close" onClick={handleTrailerWindowClose} type="button">
                    <SvgIcon icon={IconClose} width={24} height={24} />
                </Button>
            </div>
        </div >
    )
}

export default TrailerWindow