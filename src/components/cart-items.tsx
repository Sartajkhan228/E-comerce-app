import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { addToCart, removeCartItem } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

type CartItemProps = {
    cartItems: any

}

const CartItems = ({ cartItems }: CartItemProps) => {

    const dispatch = useDispatch()
    const { productId, photo, name, price, quantity, stock } = cartItems;


    const incrementHandler = () => {
        if (quantity < stock) {
            toast.error("Out of stock")
        } else {
            dispatch(addToCart({
                ...cartItems,
                quantity: 1,
            }))
        }
    };

    const decrementHandler = () => {
        if (quantity > 1) {
            dispatch(addToCart({
                ...cartItems,
                quantity: -1
            }))
        }
    };


    const removeHandler = () => {
        dispatch(removeCartItem(productId))
    }


    return (
        <div className="cart-item">
            <img src={`${server}/${photo}`} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>£{price}</span>
            </article>

            <div>
                <button onClick={decrementHandler}>-</button>
                <p>{quantity}</p>
                <button onClick={incrementHandler}>+</button>
            </div>
            <button onClick={removeHandler}>
                <FaTrash />
            </button>

        </div>
    )
}

export default CartItems