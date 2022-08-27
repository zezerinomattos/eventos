import React, {useState} from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import { useSelector} from 'react-redux';

// MEUS IMPORTS
import Navbar from '../../components/navbar'


function Home(){
    return(
        <>
            <Navbar />
            <h1>{ useSelector(state => state.usuarioEmail)}</h1>
            <h1>LOgado: { useSelector(state => state.usuarioLogado)}</h1>
        </>
    );
}

export default Home;