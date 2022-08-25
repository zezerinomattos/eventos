import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from '../view/login';
import NovoUsuario from '../view/usuario-novo';
import Home from '../view/Home';


export default function Rotas(){
    return(
        <BrowserRouter>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/novousuario" element={<NovoUsuario />} />
               <Route path="/login" element={<Login />} />
           </Routes>
        </BrowserRouter>
    );
}
