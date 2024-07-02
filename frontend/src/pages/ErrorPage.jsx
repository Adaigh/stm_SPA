import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <div id='error-page'>
            <h1>Oops! Page not found.</h1>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}

export default ErrorPage