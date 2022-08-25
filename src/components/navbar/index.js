import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

//MEUS IMPORTS
import logo from '../../assets/logo.png';


function Navbar(){
    return(
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img className='navebar-img-Logo' src={logo} alt="Logotipo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/novousuario">Cadastrar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;