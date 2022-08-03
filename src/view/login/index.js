import React, {useState} from 'react';
import './style.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

//imagem
import logo from '../../assets/logo.png';

function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] =useState();

    function logar(){
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(resultado => {
                alert('USUÁRIO LOGADO!');
            })
            .catch(erro => {
                alert(erro);
            });

    }

    return(
        <div className="login-content d-flex align-items-center">
            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <img className="mb-4" src={logo} alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                </div>

                
                <input type="email" id="inputEmail" className="form-control my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                
                <input type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
                

                <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Entrar</button>

                <div className="msg-login text-white text-center my-5">
                    <span><strong>Wow!</strong> Você está conectado! &#128526;</span> <br/>
                    <span><strong>Ops!</strong> Verifique se a senha ou usuários estão corretos! &#128532;</span>
                </div>

                <div className="opcoes-login mt-5 text-center">  
                    <a href="#" className="mx-2">Recuperar Senha</a> 
                    <span className="text-white">|</span>
                    <a href="#" className="mx-2">Quero Cadastrar</a>
                </div>
            </form>
        </div>
    )
}

export default Login;