import './Footer.scss'
import IconVK from '../../assets/icons/icon-vk.svg'
import IconYoutube from '../../assets/icons/icon-youtube.svg'
import IconOK from '../../assets/icons/icon-ok.svg'
import IconTelegram from '../../assets/icons/icon-telegram.svg'
import SvgIcon from '../../ui/Svg/Svg'



const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__wrapper">
                        <div className="footer__socials">
                            <a href="#" className="footer__socials-link" aria-label="Ссылка на Вконтакте">
                                <SvgIcon width={36} height={36} icon={IconVK} />
                            </a>
                            <a href="#" className="footer__socials-link" aria-label="Ссылка на Youtube">
                                <SvgIcon width={36} height={36} icon={IconYoutube} />
                            </a>
                            <a href="#" className="footer__socials-link" aria-label="Ссылка на Одноклассники">
                                <SvgIcon width={36} height={36} icon={IconOK} />
                            </a>
                            <a href="#" className="footer__socials-link" aria-label="Ссылка на Telegram">
                                <SvgIcon width={36} height={36} icon={IconTelegram} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    )
}

export default Footer