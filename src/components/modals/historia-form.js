import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import datosapis from '../utils/apis';
import storage from '../utils/storage';

export default class HistoriaForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historia: "",
            historias: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getHistoriasDeFoto = this.getHistoriasDeFoto.bind(this);
        this.borraHistoria = this.borraHistoria.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    formateaFecha(fecha) {
        const mes = (fecha.getMonth() + 1) > 9 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1);
        const dia = fecha.getDate() > 9 ? fecha.getDate() : "0" + fecha.getDate();
        const fechaFormateada = fecha.getFullYear() + "-" + mes + "-" + dia;

        return fechaFormateada
    }

    buildForm() {
        /* Formatear fecha */
        const fecha = new Date();

        let formData = new FormData();

        formData.append("historia", this.state.historia);
        formData.append("fecha_foto", this.formateaFecha(fecha));
        formData.append("foto_id", this.props.fotoId);
        formData.append("usuario_id", storage.get('Id'));
        
        return formData;
    }

    handleSubmit(event) {
        const urlApi = datosapis.urlapi + "historia_nueva";

        axios
            .post(
                urlApi, 
                this.buildForm()
            )
            .then(response => {
                this.props.handleSuccessfullFormSubmission(response.data);

                this.setState({
                    historia: "",
                    historias: []
                });

                this.getHistoriasDeFoto();

            })
            .catch(error => {
                console.log("handleSubmit for historia error", error);
            });

        event.preventDefault();
    }

    getHistoriasDeFoto() {
        const urlApi = datosapis.urlapi + "historias/foto_id/" + this.props.fotoId;

        axios
        .get(urlApi)
        .then(response => {
            this.setState({
                historias: response.data
            });
        })
        .catch(error => {
            console.log("Error in getHistoriasDeFoto ", error);
        });
    }

    borraHistoria(historiaId) {
        const urlApi = datosapis.urlapi + "historia_borra/" + historiaId;

        axios
        .delete(urlApi)
        .then(response => {
            alert("Historia Borrada");
            this.getHistoriasDeFoto();
        })
        .catch(error => {
            console.log("Error in borraHistoria ", error);
        });
    }

    componentDidMount() {
        this.getHistoriasDeFoto();
    }

    render() {
        const historiasFoto = this.state.historias.map(historia => {
            return(
                <div key={historia.id} className="historia-contenedor">
                    <div className="historia">{historia.historia}</div>
                    <div className="fecha-historia">
                        {new Date(historia.fecha_historia).toLocaleDateString('sp-es', {weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                    </div>
                    <div className="usuario">{historia.usuario_nombre}</div>
                    <div className="borrar">
                        {historia.usuario_id === storage.get('Id') ? 
                            (<a onClick={() => this.borraHistoria(historia.id)}>
                                <FontAwesomeIcon icon="trash" />
                            </a>)
                            : ""
                        }
                    </div>
                    <hr></hr>
                </div>
            );
        });

        return(
            <div className="contenedor">
                <div className="form-contenedor">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-contenedor-historia">
                            <textarea 
                                type='text'
                                onChange={this.handleChange}
                                name='historia'
                                placeholder='Nueva Historia'
                                value={this.state.historia}
                            />
                        </div>

                        <br></br>

                        <div className="form-contenedor-button">
                            <button className="btn">Agregar Historia</button>
                        </div>
                    </form>
                </div>

                <br></br>
                <br></br>

                <div className="historias-contenedor">
                    {historiasFoto}
                </div>
            
            </div>
        );
    }
}