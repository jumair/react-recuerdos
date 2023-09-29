import React, { Component } from "react";
import axios from "axios";

import datosapis from '../utils/apis';

export default class NumMeGusta extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            numQuienes: 0 
        };
    }

    getRecuerdoNumQuienes() {
        const urlApi = datosapis.urlapi + "num_quienes/";

        axios
            .get(
                urlApi + this.props.recuerdoId
                //`http://127.0.0.1:3001/api/num_quienes/${this.props.recuerdoId}`
                //`https://jumairor.pythonanywhere.com/api/num_quienes/${this.props.recuerdoId}`
            )
            .then(response => {
                this.setState({
                    numQuienes: response.data.num_quienes
                });
            })
            .catch(error => {
                console.log("getRecuerdoNumQuienes error", error);
            });
    }

    componentDidMount() {
        this.getRecuerdoNumQuienes();
    }

    render() {
        const cuantos = this.state.numQuienes;

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
            <div style={{color: colorear}}>{this.state.numQuienes} Usuarios etiquetados en la foto</div>
        );
    }

}