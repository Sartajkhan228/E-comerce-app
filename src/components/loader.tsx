

const Loader = () => {

    return (
        <div className="loader-wrapper">
            <span className="loader"></span>
        </div>
    );
};

export default Loader;


export const Skeletonloader = () => {
    return (
        <div className="skeleton-loader">
            <div className="skeleton-shape"></div>
            <div className="skeleton-shape"></div>
            <div className="skeleton-shape"></div>
        </div>
    )
}
