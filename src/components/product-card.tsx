import { FaPlus } from "react-icons/fa";

type ProductProps = {

    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;

}

const server = "http://localhost:3000";


const ProductCard = ({ productId, photo, name, price, stock, handler }: ProductProps) => {
    return (
        <div className="product-card">
            <img src={`${server}/${photo}`} alt={name} className="card-product-image" />
            <p>{name}</p>
            <span>£{price}</span>

            <div>
                <button onClick={() => handler()}>
                    <FaPlus />
                </button>
            </div>

        </div>
    )
}

export default ProductCard;