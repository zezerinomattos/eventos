import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Meus inports
import './style.css';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';



function EventoDetalhes(props){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const {id} = useParams();
    const usuarioLogado = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        firebase.firestore().collection('eventos').doc(id).get()
            .then(resultado => {
                setEvento(resultado.data())

                firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL()
                    .then(url => setUrlImg(url));
            });
    })

    return(
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='row'>
                    <img src={urlImg} className='img-banner' alt="Banner" />
                    <div className='col-12 mt-1 text-right visualizacoes'>
                        <i class="fas fa-eye"></i> <span>{evento.visualizacoes}</span>
                    </div>
                    <h3 className='text-center my-5 titulo'><strong>{evento.titulo}</strong></h3>
                </div>
            

                <div className='row mt-5 d-flex justify-content-around mx-0'>
                    <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                        <i className='fas fa-ticket-alt fa-2x'></i>
                        <h5><strong>Tipo</strong></h5>
                        <span className='mt-3'>{evento.tipo}</span>
                    </div>

                    <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                        <i className='fas fa-calendar-alt fa-2x'></i>
                        <h5><strong>Data</strong></h5>
                        <span className='mt-3'>{evento.data}</span>
                    </div>

                    <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                        <i className='fas fa-clock fa-2x'></i>
                        <h5><strong>Hora</strong></h5>
                        <span className='mt-3'>{evento.hora}</span>
                    </div>
                </div>

                <div className='row box-detalhes mt-5'>
                    <h5 className='text-center'><strong>Detalhes do Evento</strong></h5>
                    <p className='text-center p-4'>{evento.detalhes}</p>
                </div>

                {
                    usuarioLogado === evento.usuario ?
                        <Link to='' className='btn-editar' ><i className='fas fa-pen-square fa-3x'></i></Link>
                    :   '' 
                }   

            </div>
        </>
    );
}

export default EventoDetalhes;