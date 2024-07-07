import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
  }, [authStatus, authentication, navigate]);

  return isLoading ? <Loader /> : <>{children}</>;
}
