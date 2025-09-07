
type TProps = {
    width: number,
    height: number,
    icon: React.ReactNode,
    className?: string,
}


const SvgIcon = ({ width, height, icon, className }: TProps) => {
    return (
        <svg className={className} width={width} height={height}>
            <use href={`#${icon}`} />
        </svg>
    )
}
export default SvgIcon