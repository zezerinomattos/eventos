import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from '../view/login';
import NovoUsuario from '../view/usuario-novo';


export default function Rotas(){
    return(
        <BrowserRouter>
           <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/novousuario" element={<NovoUsuario />} />
           </Routes>
        </BrowserRouter>
    );
}
