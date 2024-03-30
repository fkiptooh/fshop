import { Routes, Route } from "react-router-dom";
import { CompleteRegistration, Home, Login, Register } from "./pages";
import { Header } from "./components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload : {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    });

    return () => unSubscribe();
  }, [])
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<CompleteRegistration/>} />
      </Routes>
    </>
  );
}

export default App;
