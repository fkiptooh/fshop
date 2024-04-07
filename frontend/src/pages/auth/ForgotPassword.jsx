import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const config = {
            url: import.meta.env.VITE_APP_DEV_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
          }

        await auth.sendPasswordResetEmail(email, config).then(() => {
            setLoading(false);
            setEmail("")
            toast.success(`Check your email ${email} to reset your password`);
        }).catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log(error);
        })
    }

    return (
        <div className="conatiner col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to reset password"
                    autoFocus
                />
                <br/>
                <button className="btn btn-raised btn-primary" disabled={!email}>Submit</button>
            </form>
        </div>
    )
}