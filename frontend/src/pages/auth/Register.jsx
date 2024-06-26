import { useState } from "react";
import { auth  } from "../../firebase";
import { toast } from "react-toastify";

export const Register = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const config = {
      url: import.meta.env.VITE_APP_DEV_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}. Click to complete registration`);

    window.localStorage.setItem("emailForRegistration", email);

    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Enter your email to register"
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br/>

      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4>Register</h4>
        {registerForm()}
      </div>
    </div>
  </div>
  );
};
