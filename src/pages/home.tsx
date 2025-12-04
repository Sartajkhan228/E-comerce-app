import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import image from "../assets/assets/images/tails.png"

const Home = () => {

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
                    photo={image}

                />
            </main>
        </div>
    )
}

export default Home