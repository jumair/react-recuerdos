import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import datosapis from '../utils/apis';

export default class MasVistos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recuerdosMasPopulares: []
        }

        this.verRecuerdo = this.verRecuerdo.bind(this);
        this.getRecuerdosMasPopulares = this.getRecuerdosMasPopulares.bind(this);
    }

    verRecuerdo() {
        document.querySelectorAll(".click").forEach(el => {
            el.addEventListener("click", e => {
              const id = e.target.getAttribute("id");

              location.href ='/b/'+id;
            });
        });
    }

    getRecuerdosMasPopulares() {
        const urlApi = datosapis.urlapi + "fotos_mas_populares";

        axios
            .get(
                urlApi,
            )
            .then(response => {
                this.setState({
                    recuerdosMasPopulares: response.data
                });
            })
            .catch(error => {
                console.log("getRecuerdosMasPopulares error", error);
            });
    }

    componentDidMount() {
        this.getRecuerdosMasPopulares();
    }

    render() {
        const recuerdosMasVistos2 = this.state.recuerdosMasPopulares.map(recuerdoItem => {
            return <div className="carrusel-div2" key={recuerdoItem.id}>
                    <Link to={`/b/${recuerdoItem.id}`}>
                        <img src={recuerdoItem.url_foto} title={recuerdoItem.fecha_foto}></img>
                    </Link>
                </div>;
        });

        return (
            <div className="masvistos-contenedor">
                <div className="masvistos-contenedor-h1-carrusel">
                    <div>
                        <h2>Los 5 recuerdos más recientes</h2>
                    </div>
                    <br></br>
                    <div className="carrusel">
                        {recuerdosMasVistos2}
                    </div>
                </div>
            </div>
        );
    }
}