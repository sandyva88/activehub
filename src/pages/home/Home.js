import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonHiking, faPersonBiking, faPersonSkating, faPersonSnowboarding, faPersonRunning} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/events/getLast', {
                    page: 0,
                    items: 6,
                    orderDesc: true
                });
                
                // Supongamos que la respuesta es un array
                setData(response.data.response.content);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        postData();
    }, []); // El arreglo vacío significa que solo se ejecutará una vez al montar el componente

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    // Función para manejar el clic y redirigir a otra página
    const handleEventClick = (idEvent) => {
      navigate(`/event/${idEvent}`); // Redirige a la página de detalle con el idEvent como parámetro
    };  

    return (
        <>
            <section className='banner-container'>
                <div className="banner-image" />
                <div className='text'> 
            </div>
            <div className= 'categorias'>
            <div className='bread-container'>
            <div className="category">
                    <FontAwesomeIcon icon={faPersonHiking} className="icon"/> 
                    <div  href="#action1">Senderismo</div >
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonRunning} className="icon"/> 
                    <div  href="#action1">Running</div >
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonHiking} className="icon"/> 
                    <div  href="#action1">Escalada</div >
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonBiking} className="icon"/> 
                    <div  href="#action1">Ciclismo</div >
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonHiking} className="icon"/> 
                    <div  href="#action1">Tenis/ Padel</div >
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonSkating} className="icon"/> 
                    <div  href="#action1">Patinaje</div >
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonSnowboarding} className="icon"/> 
                    <div  href="#action1">SkateBoarding</div>
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faPersonHiking} className="icon"/> 
                    <div  href="#action1">Tochito</div >
                </div>
                </div>
                </div>
            </ section>    
    
            <section className="events">
                <h2>Principales eventos</h2>
                <div className="events-card-container">
                    
                    {data.map((event) => (
                        <a className="event-card" key={event[0]} onClick={() => handleEventClick(event[0])} >
                            <img className="event-card-image" src={event[3]} />
                            <h5>{event[1]}</h5>
                            <p>{event[2]}...</p> {/* Muestra solo un resumen del contenido */}
                        </a>
                    ))}
                </div>
            </section>    
        </>
        
    )
}


export default Home;