import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'firebase/auth';


// MEUS IMPORTS
import './style.css';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';


function EventosCadastro(){

    const [msgTipo, setMsgTipo] = useState();

    return(
        <>
            <Navbar />
            <div className='col-12 cadastro-titulo'>
                <div className='row'>
                    <h3 className='mt-5 font-weight-bold'>Novo Evento</h3>
                </div>
            </div>

            <form className='col-10 mx-auto'>
                <div className='form-group'>
                    <label>Titulo</label>
                    <input type="text" className='form-control' />
                </div>

                <div className='form-group'>
                    <label>Tipo de Evento</label>
                    <select className='form-control' >
                        <option disabled selected value>-- Selecione um tipo ---</option>
                        <option >Festa</option>
                        <option >Teatro</option>
                        <option >Show</option>
                        <option >Evento</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label>Descrição do Evento</label>
                    <textarea className='form-control' rows='3'/>
                </div>

                <div className='form-group row'>
                    <div className='col-5'>
                        <label>Data:</label>
                        <input type="date" className='form-control' />
                    </div>

                    <div className='col-5'>
                        <label>Horário:</label>
                        <input type="time" className='form-control' />
                    </div>
                </div>

                <div className='form-group'>
                    <label>Upload da Imagem</label>
                    <input type="file" className='form-control' />
                </div>

                <button type='button' className='btn btn-lg btn-block mt-3 mb-5 btn-cadastro'>Publicar Eventos</button>

            </form>

            <div className="msg-login text-center my-2">

                    {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Evento Publicado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possivel publicar o Evento! &#128532;</span>}
                    
            </div>

        </>
    );
}

export default EventosCadastro;