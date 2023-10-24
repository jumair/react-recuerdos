import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import storage from '../utils/storage';
import datosapis from '../utils/apis';

export default class NumMeGusta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numMegusta: 0,
            legusta: 0
        };

        this.ponQuitaMegusta = this.ponQuitaMegusta.bind(this);
    }

    getRecuerdoNumMegusta() {
        const urlApi = datosapis.urlapi + "num_megusta/";

        axios
            .get(
                urlApi + this.props.recuerdoId
            )
            .then(response => {
                this.setState({
                    numMegusta: response.data.num_megusta
                });
            })
            .catch(error => {
                console.log("getRecuerdoNumMegusta error", error);
            });
    }

    getRecuerdoLegusta() {
        const urlApi = datosapis.urlapi + "legusta/";

        axios
            .get(
                urlApi + this.props.recuerdoId + "/" + storage.get('Id')
            )
            .then(response => {
                this.setState({
                    legusta: response.data.le_gusta
                });
            })
            .catch(error => {
                console.log("getRecuerdoLegusta error", error);
            });
    }

    ponQuitaMegusta(operacion) {
        const formData = new FormData();
        formData.append("operacion", operacion);
        formData.append("foto_id", this.props.recuerdoId);
        formData.append("usuario_id", storage.get('Id'));

        const urlApi = datosapis.urlapi + "pon_quita_megusta";

        axios
            .post(
                urlApi, formData
            )
            .then(response => {
                this.setState({
                    legusta: operacion
                });

                this.getRecuerdoNumMegusta();
            })
            .catch(error => {
                console.log("ponQuitaMegusta error ", error);
            });
    }

    componentDidMount() {
        this.getRecuerdoNumMegusta();
        this.getRecuerdoLegusta();
    }

    render() {
        const porCiento = this.state.numMegusta / this.props.numUsuarios;

        let colorear = "#000000"; // negro
        if (porCiento <= 0.2) {
            colorear = "#38b6ff";  // azul-camara
        } else {
            if (porCiento > 0.2 && porCiento <= 0.6) {
                colorear = "#ff914d";  // naranja-camara
            } else {
                colorear = "#7ed957"; // verde-camara
            }
        }
        
        return(
            <div>
                <div style={{color: colorear}}>Gusta a {this.state.numMegusta} de {this.props.numUsuarios} Usuarios</div>

                <div className="enlaces">
                    {this.state.legusta === 1 ? (
                            <div>
                                <FontAwesomeIcon icon="fa-solid fa-heart" style={{color: "#7ed957"}} />
                                <a onClick={() => this.ponQuitaMegusta(0)} style={{color: "#7ed957"}}> Te gusta la foto</a>
                            </div>
                            ) 
                        : (
                            <div>
                                <FontAwesomeIcon icon="fa-regular fa-heart" style={{color: "#38b6ff"}} />
                                <a onClick={() => this.ponQuitaMegusta(1)}> Haz click si te gusta la foto</a>
                            </div>
                            )
                    }
                </div>
            </div>
        );
    }
}