import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from "react-redux";

import store from '../store/';

import Login from '../view/login';
import NovoUsuario from '../view/usuario-novo';
import Home from '../view/Home';

export default function Rotas(){
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/novousuario" element={<NovoUsuario />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
