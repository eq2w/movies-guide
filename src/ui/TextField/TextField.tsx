type TProps = {
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    className: string | 'undefined';
}


const TextField = ({ className, value, onChange, placeholder }: TProps) => {
    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            className={className}
            onChange={onChange}
        />)
}

export default TextField