import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../index";
import { authRoutes, publicRoutes, adminRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { getRole } from '../http/userAPI';

const AppRouter = () => {
  const { user } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await getRole();
        if (data.role === "ADMIN") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while fetching the role
  }

  return (
    <Routes>
      {isAdmin && adminRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      {user.isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path='*' element={<Navigate to={SHOP_ROUTE} />} exact />
    </Routes>
  );
};

export default AppRouter;
