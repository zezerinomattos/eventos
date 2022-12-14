import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store/';

import Login from '../view/login';
import NovoUsuario from '../view/usuario-novo';
import Home from '../view/Home';
import UsuarioRecuperarSenha from "../view/usuario-recuperar-senha";
import EventosCadastro from "../view/evento-cadastro";
import EventoDetalhes from "../view/evento-detalhes";

export default function Rotas(){
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/eventos/:parametro" element={<Home />} />
                        <Route path="/novousuario" element={<NovoUsuario />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/usuariorecuperarsenha" element={<UsuarioRecuperarSenha />} />
                        <Route path="/eventoscadastro" element={<EventosCadastro />} />
                        <Route path="/eventodetalhes/:id" element={<EventoDetalhes />} /> 
                        <Route path="/editarevento/:id" element={<EventosCadastro />} /> 
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
