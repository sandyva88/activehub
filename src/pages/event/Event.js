import './Event.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Event = () => {

    const { idEvent } = useParams();
    const [evento, setEvento] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Hacer la solicitud GET con axios
        axios.get(`http://localhost:8080/events/get/${idEvent}`)
        .then(response => {
          setEvento(response.data.response); // Guardar los datos recibidos en el estado
          setLoading(false); // Finalizar la carga
        })
        .catch(error => {
          setError(error.message); // Guardar el error si ocurre
        setLoading(false);
        });
    }, []);

    window.addEventListener('scroll', function() {
        const parallaxImage = document.querySelector('.parallax-img');
        let scrollPosition = window.pageYOffset;
        
        // Ajustar la posición de la imagen
        parallaxImage.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
    });

    return (
        <>
            <div className="event">
                <div class="parallax-container">
                    <img className='parallax-img' src={evento.imageUrl} />
                </ div>
                <div className='event-content'>
                    <h3>{evento.title}</h3>
                    <p className='creation-date'><strong>{evento.creationDate}</strong></p>
                    <div className='description'>
                        {evento.content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Event;