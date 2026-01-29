import { Link } from "react-router-dom";

const NotFound = () => {


    return (
        <div className="not-found">
            <div className="not-found__content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link to="/" className="not-found__btn">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};


export default NotFound;