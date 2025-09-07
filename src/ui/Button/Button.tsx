import './Button.scss'

type TProps = {
    isDisabled?: boolean,
    type?: "submit" | "reset" | "button",
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    ariaLabel?: string,
}


const Button = ({ isDisabled, type, children, className, onClick, ariaLabel }: TProps) => {

    return (
        <button
            disabled={isDisabled}
            type={type}
            className={className}
            onClick={onClick}
            aria-label={ariaLabel}>
            {children}
        </button>
    )
}

export default Button