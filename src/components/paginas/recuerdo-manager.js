import React, { Component } from "react";
import axios from 'axios';
import crypto from "crypto";

import RecuerdoForm from "../manager/recuerdo-form";
import RecuerdoBarraLista from "../manager/recuerdo-barra-lista";
import storage from '../utils/storage';
import datosapis from '../utils/apis';

export default class RecuerdoManager extends Component {
    constructor() {
        super();

        this.state = {
            recuerdoItems: [],
            recuerdoToEdit: {}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearRecuerdoToEdit = this.clearRecuerdoToEdit.bind(this);
    }

    clearRecuerdoToEdit() {
        this.setState({
            recuerdoToEdit: {}
        });
    }

    handleEditClick(recuerdoItem) {
        this.setState({
            recuerdoToEdit: recuerdoItem
        });
    }

    borraFotoDeCloudinary(recuerdoItem) {
        const generatePublicId = (imageUrl) => {
            const arrayRes = imageUrl.split("/");
            const carpeta = arrayRes[arrayRes.length - 2];
            const nombreConExtension = arrayRes[arrayRes.length - 1];
            const [nombre] = nombreConExtension.split(".");
            const resultado = carpeta + "/" + nombre;
            return resultado;
        }

        const generateSHA1 = (data) => {
            const hash = crypto.createHash("sha1");
            hash.update(data);
            return hash.digest("hex");
        };
          
        const generateSignature = (publicId, apiSecret) => {
            const timestamp = new Date().getTime();
            return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        };

        const handleDelete = ({ publicId }) => {
            /*const cloudName = "dwuug0hqs";
            const apiKey = "183985575138611";
            const apiSecret = "oRJsBfr9OuYPKvXWeffqy99-SsU";*/

            const cloudName = datosapis.cloudinary.cloudName;
            const apiKey = datosapis.cloudinary.apiKey;
            const apiSecret = datosapis.cloudinary.apiSecret;

            const timestamp = new Date().getTime();
            const signature = generateSHA1(generateSignature(publicId, apiSecret));
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

            axios
                .post(url, {
                    public_id: publicId,
                    signature: signature,
                    api_key: apiKey,
                    timestamp: timestamp,
                })
                .then((response) => {
                    this.borrarInformacionFoto(recuerdoItem);
                    //console.log("Image deleted from cloudinary: ", response);      
                })
                .catch((error) => {
                    console.error("Unable to delete image: ", error)
                });
        };

        const publicId = generatePublicId(recuerdoItem.url_foto);
        handleDelete({publicId});
    }

    borrarInformacionFoto(recuerdoItem) {
        const urlApi = datosapis.urlapi + "foto_borra/";

        axios
            .delete(
                urlApi + recuerdoItem.id
                //`http://127.0.0.1:3001/api/foto_borra/${recuerdoItem.id}`
                //`https://jumairor.pythonanywhere.com/api/foto_borra/${recuerdoItem.id}`
            )
            .then(response => {
                this.setState({
                    recuerdoItems: this.state.recuerdoItems.filter(item => {
                        return item.id !== recuerdoItem.id;
                    })
                });

                // Como limpiar el form desde aqui??? Usando alguna variable de estado ???
                window.location.reload(true);

                alert("Borrar " + response.data);
                return response.data;
            })
            .catch(error => {
                console.log("handleDeleteClick error", error);
            });
    }

    handleDeleteClick(recuerdoItem) {
        this.borraFotoDeCloudinary(recuerdoItem);
    }

    handleEditFormSubmission() {
        this.getRecuerdoItems();
    }

    handleNewFormSubmission(recuerdoItem) {
        this.setState({
            recuerdooItems: [recuerdoItem].concat(this.state.recuerdoItems)
        });
        this.getRecuerdoItems();
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error);
    }

    getRecuerdoItems() {
        const usuarioId = storage.get('Id');
        const urlApi = datosapis.urlapi + "fotos/usuario_id/";

        axios
            .get(
                urlApi + usuarioId
                //`http://127.0.0.1:3001/api/fotos/usuario_id/${usuarioId}`
                //`https://jumairor.pythonanywhere.com/api/fotos/usuario_id/${usuarioId}`
            )
            .then(response => {
                this.setState({
                    //recuerdoItems: response.data Funciona igual
                    recuerdoItems: [...response.data]
                });
            })
            .catch(error => {
                console.log("error in getRecuerdoItems", error);
            });
    }

    componentDidMount() {
        this.getRecuerdoItems();
    }

    render() {
        return(
            <div className="recuerdo-manager-wrapper">
                <div className="left-column">
                    <RecuerdoForm 
                        recuerdoToEdit={this.state.recuerdoToEdit}
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                        clearRecuerdoToEdit={this.clearRecuerdoToEdit}
                    />
                </div>

                <div className="right-column">
                    <RecuerdoBarraLista 
                        data={this.state.recuerdoItems}
                        handleDeleteClick={this.handleDeleteClick}
                        handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        );
    }
}