import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NumMeGusta from "../recuerdo/num-megusta";
import NumQuienes from "../recuerdo/num-quienes";

const RecuerdoItem = props => {
    const {
        id,
        url_foto,
        titulo,
        descripcion,
        estado_foto,
        fecha_foto,
        fecha_foto_subida,
        usuario_id
    } = props.recuerdoItem;

    return (
        <div className='recuerdo-item-contenedor'>
            <Link to={`/b/${id}`}>
                <h1>{titulo}</h1>
            </Link>
            
            <div className="imagen-contenedor">
                <img src={url_foto} />
            </div>
            
            <div className='contenido'>
                {descripcion}
            </div>

            <div className='info'>
                <div className='info-columna'>
                    <div className='info-columna-icono'>
                        <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
                    </div>
                    <div className='info-columna-dato'>
                        <NumMeGusta recuerdoId={id} numUsuarios={props.numUsuarios}/>
                    </div>
                </div>

                <div className='info-columna'>
                    <div className='info-columna-icono'>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                    </div>
                    <div className='info-columna-dato'>
                        <NumQuienes recuerdoId={id}/>
                    </div>
                </div>

                <div className='info-columna'>
                    <div className='info-columna-icono'>
                        <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
                    </div>
                    <div className='info-columna-dato'>
                        x Historias
                    </div>
                </div>
            </div>

            <div className='enlaces'>
                <br></br>
                <br></br>
                <div>
                    <a onClick={props.abreHistoriaModal}>Añadir historia a la foto</a>
                </div>
            </div>

            <div className='raya-contenedor'>
                <div className="raya"></div>
            </div>
            <br></br>
        </div>
    );
}

export default RecuerdoItem;