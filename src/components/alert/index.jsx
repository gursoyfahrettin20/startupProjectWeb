export default function Alert(props) {
    const { children, status, styleType, center } = props;

    return (
        <>
            <div className={`alert alert-${styleType || 'success'} ${center && "text-center"}`} role="alert">
                {children ? children : (status ? status : "Children değeri veya status değeri girmeyi unutmayın..")}
            </div>
        </>
    );
}

