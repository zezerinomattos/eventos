import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
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
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);

    function remover(){
        firebase.firestore().collection('eventos').doc(id).delete()
            .then(() => {
                setExcluido(1);
            })
    }

    useEffect(() => {
        if(carregando){

            firebase.firestore().collection('eventos').doc(id).get()
                .then(resultado => {
                    setEvento(resultado.data())

                    //Incremento de visualizações 
                    firebase.firestore().collection('eventos').doc(id).update('visualizacoes', resultado.data().visualizacoes + 1)

                    firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL()
                        .then(url => {
                            setUrlImg(url);
                            setCarregando(0);
                        });
                });
        }else{
            firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL()
                .then(url => setUrlImg(url));
        }

    }, [])

    return(
        <>
            <Navbar />

            {
                excluido ? <Navigate to='/' /> : null
            }

            <div className='container-fluid'>
                {
                    carregando ? 
                        <div className='row mt-5'><div className="spinner-border text-danger mx-auto" role="status"><span className="visually-hidden"></span></div></div>
                    :
                        <div>
                            <div className='row'>
                                <img src={urlImg} className='img-banner' alt="Banner" />
                                <div className='col-12 mt-1 text-right visualizacoes'>
                                    <i class="fas fa-eye"></i> <span>{evento.visualizacoes + 1}</span>
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
                                    <Link to={`/editarevento/${id}`} className='btn-editar' ><i className='fas fa-pen-square fa-3x'></i></Link>
                                :   '' 
                            }   

                            {   
                                usuarioLogado === evento.usuario ?
                                    <button onClick={remover} type='button' className='btn btn-lg btn-block mt-3 mb-5 btn-remover'>Remover Evento</button>
                                : ''
                            }
                        </div>
                }
            </div>
        </>
    );
}

export default EventoDetalhes;