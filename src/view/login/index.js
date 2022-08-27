import React, {useState} from 'react';
import './style.css';
import { Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import firebase from '../../config/firebase';
import 'firebase/auth';

//imagem
import logo from '../../assets/logo.png';

function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] =useState();
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState();

    const dispatch = useDispatch();

    function logar(){       
        setCarregando(1);

        if(!email || !senha){
            setCarregando(0);
            setMsgTipo('erro');
            return;
        }
        
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(resultado => {

                setCarregando(0);
                setMsgTipo('sucesso');
                setTimeout(() => {
                    dispatch({type: 'LOG_IN', usuarioEmail: email})
                }, 1500);               
            })
            .catch(erro => {
                setCarregando(0);
                setMsgTipo('erro');
            });
    }

    return(
        <div className="login-content d-flex align-items-center">

            {
                useSelector(state => state.usuarioLogado) > 0 ? <Navigate to='/' /> : null
            }

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <img className="mb-4" src={logo} alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                </div>

                
                <input type="email" id="inputEmail" className="form-control my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                
                <input type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
                
                {
                    carregando ? <div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
                    : <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Entrar</button>
                }

                <div className="msg-login text-white text-center my-5">

                    {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Você está conectado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou usuários estão corretos! &#128532;</span>}
                    
                </div>

                <div className="opcoes-login mt-5 text-center">  
                    <a href="#" className="mx-2">Recuperar Senha</a> 
                    <span className="text-white">|</span>
                    <Link to='/novousuario' className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;