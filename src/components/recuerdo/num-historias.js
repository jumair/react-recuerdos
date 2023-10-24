import React, { Component } from "react";
import axios from "axios";

import datosapis from '../utils/apis';

export default class NumHistorias extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            numHistorias: 0 
        };
    }

    getRecuerdoNumHistorias() {
        const urlApi = datosapis.urlapi + "num_historias/";

        axios
            .get(
                urlApi + this.props.recuerdoId
            )
            .then(response => {
                this.setState({
                    numHistorias: response.data.num_historias
                });
            })
            .catch(error => {
                console.log("getRecuerdoNumHistorias error", error);
            });
    }

    componentDidMount() {
        this.getRecuerdoNumHistorias();
    }

    render() {
        const cuantos = this.state.numHistorias;

        let colorear = "#000000"; // negro
        if (cuantos <= 1) {
            colorear = "#38b6ff";  // azul-camara
        } else {
            if (cuantos > 1 && cuantos <= 3) {
                colorear = "#ff914d";  // naranja-camara
            } else {
                colorear = "#7ed957"; // verde-camara
            }
        }

        return(
            <div style={{color: colorear}}>{this.state.numHistorias} Historias</div>
        );
    }

}