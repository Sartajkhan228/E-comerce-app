import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/cart-items";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { CartReducerInitialState } from "../types/user-reducer";
import { calculatePrice, discountApplied } from "../redux/reducer/cartReducer";
import axios from "axios";


const Cart = () => {

    const { cartItems, subTotal, tax, shippingCharges, discount, total } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer)

    const [couponCode, setCouponCode] = useState<string>("");
    const [isCouponCodeValid, setIsCouponCodeValid] = useState<boolean>(false);
    const dispatch = useDispatch();



    useEffect(() => {

        if (!couponCode) {
            setIsCouponCodeValid(false);
            dispatch(discountApplied(0));
            return;
        }

        const controller = new AbortController();

        const timeOutId = setTimeout(() => {

            axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/discount`, {
                params: { coupon: couponCode },
                signal: controller.signal,
            })
                .then((res) => {
                    dispatch(discountApplied(res.data.discount));
                    console.log("COUPONCODE", res.data);
                    setIsCouponCodeValid(true);
                    dispatch(calculatePrice());
                })
                .catch((error) => {
                    if (axios.isCancel(error)) return;

                    dispatch(discountApplied(0));
                    setIsCouponCodeValid(false);
                    dispatch(calculatePrice());
                })
        }, 600);

        return () => {
            controller.abort();
            clearTimeout(timeOutId)
        }


    }, [couponCode, dispatch]);

    useEffect(() => {
        dispatch(calculatePrice())
    }, [cartItems, dispatch]);

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