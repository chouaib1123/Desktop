import { Routes, Route, Outlet ,Navigate } from "react-router-dom";
import DashBoard from "./Fragments/DashBoard/DashBoard";
import Profil from "./Sections/Profil/Profil";
import MyProducts from "./Sections/MyProducts/MyProducts";
import AddProduct from "./Sections/MyProducts/AddProduct/AddProduct";
import { jwtDecode } from "jwt-decode";
import Commande from "./Sections/Commands/commande";

const isArtisan = () => {
  const token = localStorage.getItem('token');

  if (typeof token !== 'string') {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userType = decodedToken.userType;
    return userType === "artist";
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

const MainLayout = () => {
  return (
    <>
      <DashBoard />
      <Outlet />
    </>
  );
};
const ProtectedRoute = ({ element }) => {
  return isArtisan() ? element : <Navigate to="/auth" />;
};

function Account() {
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Profil />} />
      <Route path="requests" element={<Commande />} />
      <Route path="MyProducts" element = {<ProtectedRoute element={<MyProducts />} />}  />
      
      </Route>
      <Route path="MyProducts/AddProduct" element = {<ProtectedRoute element={<AddProduct />} />}  />
    </Routes>
  );
}

export default Account;
