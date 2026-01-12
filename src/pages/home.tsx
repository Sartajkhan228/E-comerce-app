import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useGetLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast";
import Loader, { Skeletonloader } from "../components/loader";

const Home = () => {

    const { data, isLoading, isError } = useGetLatestProductsQuery("");

    console.log("DATA", data)


    if (isError) toast.error("error loading products");

    if (data) toast.dismiss();

    const addToCartHandler = () => { }


    return (
        <div className="home">
            <section></section>
            <h1>
                Latest Products
                <Link to={"/search"} className="findmore">
                    More
                </Link>
            </h1>

            <main>
                <Skeletonloader />
                {isLoading ? <Loader />
                    :
                    (
                        data?.product.map(item => (
                            <ProductCard
                                key={item._id}
                                productId={item._id}
                                name={item.name}
                                price={item.price}
                                stock={item.stock}
                                handler={addToCartHandler}
                                photo={item.photo}
                            // photo="https://m.media-amazon.com/images/I/71cWZUr9SVL._AC_SX342_.jpg"
                            />
                        ))
                    )
                }
            </main>
        </div>
    )
}

export default Home;