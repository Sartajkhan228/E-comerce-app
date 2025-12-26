import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"


const Login = () => {

    const [gender, setGender] = useState<string>("");
    const [date, setDate] = useState<string>("");


    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const { user } = await signInWithPopup(auth, provider);

            console.log("USER", user)

        } catch (error) {
            console.error(error)
            toast.error("Login error")
        }
    }

    return (
        <div className="login">
            <main >
                <h1 className="heading">
                    login
                </h1>

                <div>
                    <label >Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Chose gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label>Date of birth</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                    <p>Already signin once</p>
                    <button onClick={loginHandler}>
                        <FcGoogle /> <span>Signin with Google</span>
                    </button>
                </div>

            </main>
        </div>
    )
}

export default Login;