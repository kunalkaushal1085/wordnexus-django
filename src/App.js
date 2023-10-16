import "./App.css";

import { HomePage } from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./component/login/LoginPage";
import { RegisterPage } from "./component/register/RegisterPage";
import { SuccessCard } from "./component/successCard/successCard";
import { CancelCard } from "./component/cancelCard/CancelCard";
import Loader from "./component/loader/Loader";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.slice);
  console.log("isLoading", isLoading);
  return (
    <>
      <div className="App">
        {isLoading && <Loader />}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/success" element={<SuccessCard />} />
            <Route path="/cancel" element={<CancelCard />} />
          </Routes>
        </BrowserRouter>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
