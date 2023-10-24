import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NumMeGusta from "../recuerdo/num-megusta";
import NumQuienes from "../recuerdo/num-quienes";
import NumHistorias from "../recuerdo/num-historias";

import HistoriaModal from "../modals/historia-modal";

export default class RecuerdoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historiaModalIsOpen: false
        }

        this.handleNuevaHitoriaClick = this.handleNuevaHitoriaClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
        this.setState({
            historiaModalIsOpen: false
        });

        //Refrescar la página
        window.location.reload();
    }

    handleNuevaHitoriaClick() {
        this.setState({
            historiaModalIsOpen: true
        });
    }

    render() {

        const {
            id,
            url_foto,
            titulo,
            descripcion,
            estado_foto,
            fecha_foto,
            fecha_foto_subida,
            usuario_id
        } = this.props.recuerdoItem;

        return (
            <div className="contenedor">
                <HistoriaModal
                    recuerdoItem={this.props.recuerdoItem}
                    handleModalClose={this.handleModalClose}  
                    modalIsOpen={this.state.historiaModalIsOpen} 
                />
            
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
                                <NumMeGusta recuerdoId={id} numUsuarios={this.props.numUsuarios}/>
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
                                <NumHistorias recuerdoId={id}/>
                            </div>
                        </div>
                    </div>

                    <div className='enlaces'>
                        <br></br>
                        <br></br>
                        <div>
                            <a onClick={this.handleNuevaHitoriaClick}>Añadir historia a la foto</a>
                        </div>
                    </div>

                    <div className='raya-contenedor'>
                        <div className="raya"></div>
                    </div>
                    <br></br>
                </div>

            </div>
        );
    }
}