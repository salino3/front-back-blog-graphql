import React from "react";
import { Routes, Route } from "react-router-dom";
import { DeleteUser, Home, List, Login, MyProfile, Register, UpdateUser } from "../pages";
import { list, root, pnf, login, register, privates, myprofile, updateuser, deleteuser } from ".";
import { PrivateRoutes, PublicRoutes } from "./path-routes";
import { PageNotFound } from "../components";

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
        <Route path={myprofile} element={<MyProfile />} />
        <Route path={privates + list} element={<List />} />
        <Route path={updateuser} element={<UpdateUser />} />
        <Route path={deleteuser} element={<DeleteUser />} />
        <Route path={privates + pnf} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
