import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useGetLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast";
import Loader, { Skeletonloader } from "../components/loader";
import type { CartItems } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {

    const dispatch = useDispatch()
    const { data, isLoading, isError } = useGetLatestProductsQuery("");

    console.log("DATA", data)


    if (isError) toast.error("error loading products");

    if (data) toast.dismiss();

    const addToCartHandler = (cartItems: CartItems) => {

        if (cartItems.stock < 1) return toast.error("Out of Stock");

        dispatch(addToCart(cartItems));
    }


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
                {/* <Skeletonloader /> */}
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
                            />
                        ))
                    )
                }
            </main>
        </div>
    )
}

export default Home;