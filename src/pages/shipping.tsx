import { useEffect, useState, type ChangeEvent } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CartReducerInitialState } from "../types/user-reducer";

const Shipping = () => {

    const { cartItems } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer)

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    });

    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        if (cartItems.length <= 0) {
            navigate("/cart");
        }
    }, [cartItems, navigate]);



    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => navigate("/cart")}>
                <BiArrowBack />
            </button>

            <form>
                <h1>Shipping Address</h1>

                <input
                    type="text"
                    placeholder="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleChange}
                />

                <select
                    name="country"
                    required
                    value={shippingInfo.country}
                    onChange={handleChange}
                >
                    <option value="">Choose Country</option>
                    <option value="America">America</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Uk">Uk</option>
                </select>

                <input
                    type="text"
                    placeholder="pinCode"
                    name="pinCode"
                    value={shippingInfo.pinCode}
                    onChange={handleChange}
                />

                <button>
                    pay now
                </button>
            </form>
        </div>
    );
};

export default Shipping;
