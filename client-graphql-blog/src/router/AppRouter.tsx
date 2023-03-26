import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home, List, Login, Register } from '../pages';
import { list, root, pnf, login, register } from '.';
import { PageNotFound } from '../components';


export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={root} element={<Home />} />
      <Route path={list} element={<List />} />
      <Route path={pnf} element={<PageNotFound />} />
      <Route path={login} element={<Login />} />
      <Route path={register} element={<Register />} />
    </Routes>
  );
}
