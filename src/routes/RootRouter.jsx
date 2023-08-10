import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthorizedRoutes from "./AuthorizedRoutes";

import { useSelector } from "react-redux";
import UnauthorizedRoutes from "./UnauthorizedRoutes";
export default function RootRouter() {
  const authObj = useSelector((state) => state.auth);
  return <Router>{authObj?.isAuthorized ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}</Router>;
}
