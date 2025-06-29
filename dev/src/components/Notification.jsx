export const Success = ({message}) => {
    const successStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        borderWidth: 2,
        borderColor: 'green',
        borderStyle: 'solid',
        marginTop: 16,
        marginBottom: 16,
        padding: 16
    }
    console.log("success", message);
    

    if(message === null) {
        return null
    }

    return (
        <div style={successStyle}>
            {message}
        </div>
    )
}

export const Error = ({message}) => {
    const errorStyle = {
        color: 'red',
        fontStyle: 'bold',
        fontSize: 16,
        borderWidth: 2,
        borderColor: 'red',
        borderStyle: 'solid',
        marginTop: 16,
        marginBottom: 16,
        padding: 16
    }

    if(message === null) {
        return null
    }

    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}