import React, {useState} from 'react';
import './style.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from '../../components/navbar';

function UsuarioRecuperarSenha(){

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email)
            .then(resposta => {
                setMsg('Enviamos um link no seu email para você redefinir a senha!');
            })
            .catch(erro => {
                setMsg('Verifique se o email está correto!');
            })
    }

    return(
        <>
            <Navbar />
            
            <form className='text-center form-login mx-auto mt-5'>
                <h3 className='mb-3 font-weight-bold'>Recuperar Senha</h3>
                <input type="email" className='form-control my-4' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                <div className='msg my-4 text-center'>
                    <span>{msg}</span>
                </div>

                <button type='button' className='btn btn-lg btn-block btn-enviar' onClick={recuperarSenha}>Recuperar Senha</button>
            </form>
            
        </>
    );
}

export default UsuarioRecuperarSenha;