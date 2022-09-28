import React, {useState, useEffect} from 'react';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';


// MEUS IMPORTS
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';


function Home(){

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaEventos = [];

    const {parametro} = useParams();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    

    useEffect(() => {

        if(parametro){
            firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {            
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEventos(listaEventos);
            })
        }else{

            firebase.firestore().collection('eventos').get().then(async (resultado) => {            
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEventos(listaEventos);
            })
        }
    });


    return(
        <>
            <Navbar />

            <div class="text-center p-5">
                <h2 className="my-2 mb-5">Eventos Publicados</h2>
                <input onChange={(e) => setPesquisa(e.target.value)} className="form-control me-2 text-center" type="text" placeholder="Pesquisar evento pelo título..." />
            </div>

            <main>
                <div className='row'>
                    {eventos.map(item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}
                                
                </div>
            </main>

        </>
        
    );
}

export default Home;