import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "./Pages/Products/Products";
import Navbar from "./Fragments/Navbar/Navbar";
import Footer from "./Fragments/Footer/Footer";
import Home from "./Pages/Home/home";
import "./Style.css";
import AboutUs from "./Pages/AboutUs/Aboutus";
import Product from "./Pages/Products/Product/product";
import Auth from "./Pages/Auth/Auth";
import Account from "./Pages/ProtectedPages/Account/Account";
import { Toaster } from "sonner";
import Panier from "./Pages/ProtectedPages/Panier/Panier";
import { jwtDecode } from "jwt-decode";
import Privacy from "./Pages/Privacy/Privacy";



export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth" />;
};

const RedirectIfAuthenticated = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/" /> : element;
};

const MainLayout = () => {
  const location = useLocation();
  const [shouldShowNavbar, setShouldShowNavbar] = useState(
    !location.pathname.startsWith("/auth")
  );

  useEffect(() => {
    setShouldShowNavbar(!location.pathname.startsWith("/auth"));
  }, [location]);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Outlet />
      <Toaster position="bottom-center" />
      {shouldShowNavbar && <Footer />}
    </>
  );
};

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);

    const userId = decodedToken.userId;
    const userType = decodedToken.userType;
    const userName = decodedToken.userName;
    const exp = decodedToken.exp;
    const currentTime = Date.now() / 1000; 
    const remainingTime = exp - currentTime;

    if (remainingTime <= 0) {
        console.log("Token has expired");
        localStorage.removeItem('token'); 
    } else {
        console.log("User ID:", userId);
        console.log("User Type:", userType);
        console.log("User Name:", userName);
        console.log("Remaining Time:", remainingTime);
    }
} else {
    console.error("Token not found");
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/about"
            element={<AboutUs />} />
           <Route
            path="/privacy"
            element={<Privacy />} />
          <Route
            path="/Account/*"
            element={<ProtectedRoute element={<Account />} />}
          />
          <Route
            path="/Panier"
            element={<ProtectedRoute element={<Panier />} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/auth"
            element={<RedirectIfAuthenticated element={<Auth />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
