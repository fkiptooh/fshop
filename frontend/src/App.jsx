import { Routes, Route } from "react-router-dom";
import { CompleteRegistration, Home, Login, Register } from "./pages";
import { Header } from "./components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
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
