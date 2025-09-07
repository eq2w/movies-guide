interface TProps {
    label?: string;
    children: React.ReactNode;
    errorMessage?: string;
    className?: string,
}

export const FormField = ({ children, label, errorMessage, className }: TProps) => {
    return (
        <label className={className}>
            <span className={`${className}-text`}>{label}</span>
            {children}
            {errorMessage && (
                <span className={`${className}__error-text`}>{errorMessage}</span>
            )}
        </label>
    );
};
