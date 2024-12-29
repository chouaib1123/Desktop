import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./DashBoard.css"
import { jwtDecode } from "jwt-decode";


const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userType = decodedToken ? decodedToken.userType : null;

  const routes = [
    ...(userType === 'artist' ? [{ path: '/Account/MyProducts', text: 'منتوجاتي' }] : []),
    
    { path: '/Account/requests', text: 'طلبات' },
    { path: '/Account', text: 'الملف الشخصي' }
  ];

  const currentRoute = routes.find(route => route.path === location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className="Dashboard">
      {currentRoute && <h1>{currentRoute.text}</h1>}
      <ul>
        <li>
          <Link to="/" onClick={handleLogout}>خروج</Link>
        </li>
        {routes.map((route, index) => (
          <li key={index} className={location.pathname === route.path ? 'active' : ''}>
            <Link to={route.path}>{route.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
