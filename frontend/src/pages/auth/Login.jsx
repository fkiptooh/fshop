import { useState } from "react";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  // state
  const [email, setEmail] = useState("fkiptooh@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      let idToken = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          username: user.email,
          token: idToken.token,
        },
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // google signin
  const gooogleAuth = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (response) => {
        const { user } = response;
        const idToken = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            username: user.displayName,
            token: idToken.token,
          },
        });
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  const loginForm = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Enter your email to register"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email && password.length < 6 && loading}
      >
        Login With Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}
          <Button
            onClick={gooogleAuth}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            danger
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};
