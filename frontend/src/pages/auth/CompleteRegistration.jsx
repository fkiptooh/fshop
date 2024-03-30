import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth} from "../../firebase";

export const CompleteRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await auth.signInWithEmailLink(email, window.location.href);

        if (result.user.emailVerified) {
            window.localStorage.removeItem("emailForRegistration");

            let user = auth.currentUser;

            await user.updatePassword(password)
            
        }
    } catch (error) {
        toast.error(error.message);
    }
  };
  const completeRegistration = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Set your password"
        autoFocus
      />
      <button type="submit" className="btn btn-primary mt-2">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4>Complete Registration</h4>
        {completeRegistration()}
      </div>
    </div>
  </div>
  );
};
