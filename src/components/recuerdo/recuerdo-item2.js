import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RecuerdoItem2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //currentId: this.props.match.params.slug,
            //recuerdoItem: {}
        };
    }

    getRecuerdoItem() {
        axios
            .get(
                `http://127.0.0.1:3001/api/foto/id/${this.state.currentId}`
                //`https://jumairor.pythonanywhere.com/api/foto/id/${this.state.currentId}`
            )
            .then(response => {
                //console.log("getRecuerdoItem", response.data)
                this.setState({
                    recuerdoItem: response.data[0]
                });
            })
            .catch(error => {
                console.log("getRecuerdoItem error", error);
            });
    }

    componentDidMount() {
        //this.getRecuerdoItem();
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
                            2 de 6 Me Gusta
                        </div>
                    </div>

                    <div className='info-columna'>
                        <div className='info-columna-icono'>
                            <FontAwesomeIcon icon="fa-solid fa-user" />
                        </div>
                        <div className='info-columna-dato'>
                            3 Usuarios en la foto
                        </div>
                    </div>

                    <div className='info-columna'>
                        <div className='info-columna-icono'>
                            <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
                        </div>
                        <div className='info-columna-dato'>
                            5 Historias
                        </div>
                    </div>
                </div>

                <div className='raya-contenedor'>
                    <div className="raya"></div>
                </div>
                <br></br>
            </div>
        );
    }
}