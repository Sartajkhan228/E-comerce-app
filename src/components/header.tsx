import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom"
import type { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

interface HeaderProps {
    user: User | null
}

const Header = ({ user }: HeaderProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);


    const logOutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Logout successful");
            setIsOpen(false)
        } catch (error) {
            toast.error("Logout failed");
            console.error(error)
        }
    }
    return (
        <nav className="header">
            <Link onClick={() => setIsOpen(false)} to={"/"} ><FaHouse /> </Link>
            <Link onClick={() => setIsOpen(false)} to={"/search"}><FaSearch /> </Link>
            <Link onClick={() => setIsOpen(false)} to={"/cart"}><FaShoppingBag /> </Link>

            {
                user?._id ? (
                    <>
                        <button onClick={() => setIsOpen(prev => !prev)}>
                            <FaUser />
                        </button>
                        <dialog open={isOpen}>
                            <div>
                                {user.role === "admin" && (
                                    <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>Admin</Link>
                                )}
                                <Link onClick={() => setIsOpen(false)} to={"/orders"}>Orders</Link>
                                <button onClick={() => logOutHandler()}>
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </dialog>
                    </>
                ) : <Link to={"/login"}>
                    <FaSignInAlt />
                </Link>

            }
        </nav >
    )
}

export default Header