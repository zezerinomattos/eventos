import React, {useState, useEffect} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';


// MEUS IMPORTS
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';


function Home(){

    const [eventos, setEventos] = useState([]);
    let listaEventos = [];

    useEffect(() => {
        firebase.firestore().collection('eventos').get().then(async (resultado) => {            
            await resultado.docs.forEach(doc => {
                listaEventos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setEventos(listaEventos);
            })
    });


    return(
        <>
            <Navbar />
            <main>
                <div className='row'>
                    {eventos.map(item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}
                                
                </div>
            </main>

        </>
        
    );
}

export default Home;