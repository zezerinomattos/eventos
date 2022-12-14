import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'firebase/auth';


// MEUS IMPORTS
import './style.css';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';


function EventosCadastro(props){

    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] =useState();
    const [hora, setHora] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState();

    const storage = firebase.storage();
    const db = firebase.firestore();

    const {id} = useParams();

    useEffect(() => {
        if(id){
            firebase.firestore().collection('eventos').doc(id).get()
                    .then(resultado => {
                        setTitulo(resultado.data().titulo)
                        setTipo(resultado.data().tipo)
                        setDetalhes(resultado.data().detalhes)
                        setData(resultado.data().data)
                        setHora(resultado.data().hora)
                        setFotoAtual(resultado.data().foto)
                        
            });
        }

    }, [carregando])

    function atualizar() {
        setMsgTipo(null);
        setCarregando(1);

        if(fotoNova)
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

                db.collection('eventos').doc(id).update({
                    titulo: titulo,
                    tipo: tipo,
                    detalhes: detalhes,
                    data: data,
                    hora: hora,
                    foto: fotoNova ? fotoNova.name : fotoAtual
                }).then(() => {
                    setMsgTipo('sucesso');
                    setCarregando(0);
                    
                }).catch(erro => {
                    setMsgTipo('erro');
                    setCarregando(0);
                });
                  
    }


    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);

        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail, 
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            })
                
        }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(0);
            
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
            
            
    }
    
    return(
        <>
            <Navbar />
            <div className='col-12 cadastro-titulo'>
                <div className='row'>
                    <h3 className='mt-5 font-weight-bold'>{id ? 'Editar Evento' : 'Novo Evento' }</h3>
                </div>
            </div>

            <form className='col-10 mx-auto'>
                <div className='form-group'>
                    <label>Titulo</label>
                    <input type="text" className='form-control' onChange={(e) => setTitulo(e.target.value)} value={titulo && titulo} />
                </div>

                <div className='form-group'>
                    <label>Tipo de Evento</label>
                    <select className='form-control' onChange={(e) => setTipo(e.target.value)} value={tipo && tipo}>
                        <option disabled selected value>-- Selecione um tipo ---</option>
                        <option >Festa</option>
                        <option >Teatro</option>
                        <option >Show</option>
                        <option >Evento</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label>Descri????o do Evento</label>
                    <textarea className='form-control' rows='3' onChange={(e) => setDetalhes(e.target.value)} value={detalhes && detalhes} />
                </div>

                <div className='form-group row'>
                    <div className='col-5'>
                        <label>Data:</label>
                        <input type="date" className='form-control' onChange={(e) => setData(e.target.value)} value={data && data} />
                    </div>

                    <div className='col-5'>
                        <label>Hor??rio:</label>
                        <input type="time" className='form-control' onChange={(e) => setHora(e.target.value)} value={hora && hora} />
                    </div>
                </div>

                <div className='form-group'>
                    <label>Upload da Imagem {id ? '(Caso queira manter a mesma FOTO n??o precisa escolher uma nova FOTO!)' : null }:</label>
                    <input onChange={(e) => setFotoNova(e.target.files[0]) } type="file" className="form-control"/>
                </div>

                {fotoNova ? <img src={URL.createObjectURL(fotoNova)} alt="Imagem" width="150" height="100" /> : ""}
                
                <div className='row'>
                    {
                        carregando > 0 ? <div className="spinner-border text-danger mx-auto" role="status"><span className="visually-hidden">Loading...</span></div>
                        :
                        <button type='button' className='btn btn-lg btn-block mt-3 mb-5 btn-cadastro' onClick={id ? atualizar : cadastrar}>{id ? 'Atualizar evento' : 'Publicar Eventos' }</button>
                    }
                </div>
                

            </form>

            <div className="msg-login text-center my-2">

                    {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Evento Publicado! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> N??o foi possivel publicar o Evento! &#128532;</span>}
                    
            </div>


            <footer className='fixed-bottom'>
                <Footer />
            </footer>

        </>
    );
}

export default EventosCadastro;