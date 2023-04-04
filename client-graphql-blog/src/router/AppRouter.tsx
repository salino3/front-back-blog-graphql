import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, List, Login, Private, Register } from "../pages";
import { list, root, pnf, login, register, privates, myprofile } from ".";
import { PageNotFound } from "../components";
import { PrivateRoutes, PublicRoutes } from "./path-routes";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={root} element={<PublicRoutes />}>
        <Route path={root} element={<Home />} />
        <Route path={list} element={<List />} />
        <Route path={pnf} element={<PageNotFound />} />
        <Route path={login} element={<Login />} />
        <Route path={register} element={<Register />} />
      </Route>
      {/*  */}
      <Route path={privates} element={<PrivateRoutes />}>
        <Route path={privates} element={<Home />} />
        <Route path={myprofile} element={<Private />} />
        <Route path={privates + list} element={<List />} />
        <Route path={privates + pnf} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
