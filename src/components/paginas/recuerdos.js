import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import datosapis from '../utils/apis';

import RecuerdoItem from "../recuerdo/recuerdo-item";

export default class Recuerdos extends Component {
    constructor() {
        super();

        this.state = {
            recuerdoItems: [],
            totalCount: 0,
            offsetPage: 0,
            isLoading: true,
            totalUsuarios: 0,
        }

        this.getRecuerdoItems = this.getRecuerdoItems.bind(this);
        this.getNumUsuarios = this.getNumUsuarios.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
    }

    onScroll() {
        if (this.state.isLoading || this.state.recuerdoItems.length === this.state.totalCount) {
            return;
        }

        //El +1 es para que llegue al final. Hay que tener en cuenta el encabezado con el menú.
        if (Math.trunc(window.innerHeight + document.documentElement.scrollTop + 1) === document.documentElement.offsetHeight) {
            this.getRecuerdoItems();
        }
    }

    getRecuerdoItems() {
        const urlApi = datosapis.urlapi + "fotos";

        axios
        .post(
            urlApi,
        {
            fotos: {
                limit: "4",
                offset: this.state.offsetPage.toString()
            }
        })
        .then(response => {
            this.setState({
                recuerdoItems: this.state.recuerdoItems.concat(response.data.datos),
                totalCount: response.data.reg_totales,
                offsetPage: this.state.offsetPage + 4,
                isLoading: false
            });
        })
        .catch(error => {
            console.log("error in getRecuerdoItems", error);
        });
    }

    getNumUsuarios() {
        const urlApi = datosapis.urlapi + "num_usuarios";

        axios
            .get(
                urlApi
            )
            .then(response => {
                this.setState({
                    totalUsuarios: response.data.num_usuarios
                });
            })
            .catch(error => {
                console.log("getRecuerdoNumUsuarios error", error);
            });
    }

    componentDidMount() {
        this.getNumUsuarios();
        this.getRecuerdoItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const recuerdosRegistros = this.state.recuerdoItems.map(recuerdoItem => {
            return <RecuerdoItem key={recuerdoItem.id} 
                                 recuerdoItem={recuerdoItem} 
                                 numUsuarios={this.state.totalUsuarios}
                    />;
        });

        return (
            <div className="recuerdos-contenedor">
                <div><h1>Menu Recuerdos</h1></div>

                <div className="contenido-contenedor">
                    {recuerdosRegistros}
                </div>

                {this.state.isLoading ? (
                    <div className="contenido-cargando">
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                    ) : null
                }
            </div>
        );
    }
}