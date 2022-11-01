import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MY IMPORTS
import './style.css';
import logo from '../../assets/logo.png';

function Footer(){
    return(
        <footer>
            <nav className="navbar  navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img className='navebar-img-Logo' src={logo} alt="Logotipo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link class="nav-link active" aria-current="page" to="/">Home</Link></li>                       
                        <li className="nav-item"><Link class="nav-link" to="/novousuario">Cadastrar</Link></li>                        
                        <li className="nav-item"><Link class="nav-link" to="/login">Login</Link></li>    
                    </ul>
                    </div>
                </div>
            </nav>
        </footer>
    )
}

export default Footer;