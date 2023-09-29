import React, { Component } from "react";

import imgLogo from "../../../static/assets/images/logos/camara.png"
import imgFotoVerde from "../../../static/assets/images/fotos/foto_verde_50.jpg"
import imgFotoNegra from "../../../static/assets/images/fotos/foto_negra_50.jpg"

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-contenedor">
                <div className="home-left">
                    <h3>Aplicación para guardar imágenes y sus historias relacionadas</h3>
                    <p>Se trata de una aplicación para poder guardar imágenes de amigos</p>
                    <p>y poder compartirlas con esos amigos</p>
                    <p>También se pueden crear historias sobre las fotos</p>
                    <div className="home-left-foto">
                        <img className="foto-negra" src={imgFotoNegra} />
                        <img className="foto-verde" src={imgFotoVerde} />
                    </div>
                </div>
                <div className="home-right">
                    <img src={imgLogo} />
                </div>
            </div>
        );
    }
}