import React, { Component } from "react";
import axios from "axios";

import datosapis from '../utils/apis';

export default class RecuerdoDetalle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            recuerdoItem: {},
            nombresMegusta: [],
            nombresQuienes: []
        };

        this.getRecuerdoItem = this.getRecuerdoItem.bind(this);
        this.getRecuerdoNombresMegusta = this.getRecuerdoNombresMegusta.bind(this);
        this.getRecuerdoNombresQuienes = this.getRecuerdoNombresQuienes.bind(this);
    }

    getRecuerdoItem() {
        const urlApi = datosapis.urlapi + "foto/id/";

        axios
            .get(
                urlApi + this.state.currentId
                //`http://127.0.0.1:3001/api/foto/id/${this.state.currentId}`
                //`https://jumairor.pythonanywhere.com/api/foto/id/${this.state.currentId}`
            )
            .then(response => {
                this.setState({
                    recuerdoItem: response.data[0]
                });
            })
            .catch(error => {
                console.log("getRecuerdoItem error", error);
            });
    }

    getRecuerdoNombresMegusta() {
        const urlApi = datosapis.urlapi + "megusta/";

        axios
            .get(
                urlApi + this.state.currentId
                //`http://127.0.0.1:3001/api/megusta/${this.state.currentId}`
                //`https://jumairor.pythonanywhere.com/api/megusta/${this.state.currentId}`
            )
            .then(response => {
                this.setState({
                    nombresMegusta: response.data
                });
            })
            .catch(error => {
                console.log("getRecuerdoNombresMegusta error", error);
            });
    }

    getRecuerdoNombresQuienes() {
        const urlApi = datosapis.urlapi + "quienes/";

        axios
            .get(
                urlApi + this.state.currentId
                //`http://127.0.0.1:3001/api/quienes/${this.state.currentId}`
                //`https://jumairor.pythonanywhere.com/api/quienes/${this.state.currentId}`
            )
            .then(response => {
                this.setState({
                    nombresQuienes: response.data
                });
            })
            .catch(error => {
                console.log("getRecuerdoNombresQuienes error", error);
            });
    }

    componentDidMount() {
        this.getRecuerdoItem();
        this.getRecuerdoNombresMegusta();
        this.getRecuerdoNombresQuienes();
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
        } = this.state.recuerdoItem;

        const nomsMegusta = this.state.nombresMegusta.map(megusta => {
            return <div className="nombre">{megusta.nombre}</div>;
        });

        const nomsQuienes = this.state.nombresQuienes.map(quien => {
            return <div className="nombre">{quien.nombre}</div>;
        });

        return (
            <div className="recuerdos-contenedor-detalle">
                <div className="contenido-contenedor-detalle">
                    <h1>{titulo}</h1>
                    <div className="contenido">{descripcion}</div>

                    <div className='raya-contenedor'>
                        <div className="raya"></div>
                    </div>
                    
                    <div className="fecha-foto">
                        <div>Fecha de la foto</div>
                        <div className="fecha">
                            {new Date(fecha_foto).toLocaleDateString('sp-es', {weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                        </div>
                    </div>

                    <div className='raya-contenedor'>
                        <div className="raya"></div>
                    </div>

                    <div className="fecha-foto-subida">
                        <div>Foto subida en la Fecha</div>
                        <div className="fecha">
                            {new Date(fecha_foto_subida).toLocaleDateString('sp-es', {weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                        </div>
                    </div>

                    <div className='raya-contenedor'>
                        <div className="raya"></div>
                    </div>

                    <div className="megusta">
                        <div>La foto le gusta a :</div>
                        {nomsMegusta}
                    </div>

                    <div className='raya-contenedor'>
                        <div className="raya"></div>
                    </div>

                    <div className="quienes">
                        <div>En la foto están etiquetados :</div>
                        {nomsQuienes}
                    </div>

                </div>

                <div className="imagen-contenedor-detalle">
                        <img src={url_foto} />
                </div>

            </div>
        );
    }
}