import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/cart-items";
import { Link } from "react-router-dom";

const cartItems = [
    {
        productId: "fkjhjj",
        photo: "https://m.media-amazon.com/images/I/71cWZUr9SVL._AC_SX342_.jpg",
        name: "Macbook",
        price: 3000,
        quantity: 4,
        stock: 10
    }

];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subTotal + tax + shippingCharges


const Cart = () => {

    const [couponCode, setCouponCode] = useState<string>("");
    const [isCouponCodeValid, setIsCouponCodeValid] = useState<boolean>(false);


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (Math.random() > 0.5) setIsCouponCodeValid(true);
            else setIsCouponCodeValid(false)
        }, 1000);

        return () => {
            clearTimeout(timeOutId)
            setIsCouponCodeValid(false)
        }
    }, [couponCode])


    const getValidCode = async () => {
        const response = await fetch("http://localhost:3000/api/v1/payment/discount");

        if (!response.ok) return console.log("Error getting response")

        const data = await response.json();

        setIsCouponCodeValid(true)

        // console.log("data", data)
    }

    useEffect(() => {
        getValidCode()
    })


    return (
        <div className="cart">
            <main>
                {
                    cartItems.length > 0 ? (
                        cartItems.map((i, indx) => (

                            <CartItems key={indx} cartItems={i} />
                        ))
                    ) : <h1>No Itms added</h1>
                }


            </main>

            <aside>
                <p>Subtotal: £{subTotal}</p>
                <p>Shipping Charges: £{shippingCharges}</p>
                <p>Tax: £{tax}</p>
                <p>
                    Discount: <em>-£{discount}</em>
                </p>
                <p>
                    <b>Total: £{total}</b>
                </p>

                <input type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

                {
                    couponCode && (
                        isCouponCodeValid ? (<span className="green">£{discount} off using the
                            <code>{couponCode}</code>
                        </span>) : (<span className="red">
                            Invalid coupon <VscError />
                        </span>)
                    )
                }

                {
                    cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>
                }

            </aside>
        </div>
    )
}

export default Cart;