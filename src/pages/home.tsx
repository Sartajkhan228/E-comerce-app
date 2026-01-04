import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useGetLatestProductsQuery } from "../redux/api/productApi"

const Home = () => {

    const { data, isLoading } = useGetLatestProductsQuery("");

    console.log("DATA", data)

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
                <ProductCard
                    productId="567"
                    name="macbook"
                    price={678}
                    stock={67}
                    handler={addToCartHandler}
                    photo="https://m.media-amazon.com/images/I/71cWZUr9SVL._AC_SX342_.jpg"

                />
            </main>
        </div>
    )
}

export default Home