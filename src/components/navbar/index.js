import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';

//MEUS IMPORTS
import logo from '../../assets/logo.png';


function Navbar(){

    const dispatch = useDispatch();

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
                        <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                        
                        {
                            useSelector(state => state.usuarioLogado) > 0 ?
                            
                                <>
                                    <li className="nav-item"><Link className="nav-link"  to="/eventoscadastro">Publicar Evento</Link></li>                            
                                    <li className="nav-item"><Link className="nav-link"  to="#">Meus Eventos</Link></li>
                                    <li className="nav-item btn-sair nav-link" onClick={() => dispatch({type: 'LOG_OUT'}) }>Sair</li>
                                </>
                            :
                                <>
                                    <li className="nav-item"><Link className="nav-link"  to="/novousuario">Cadastrar</Link></li>                            
                                    <li className="nav-item "><Link className="nav-link" to="/login">Login</Link></li>
                                </>

                        } 
                    </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;