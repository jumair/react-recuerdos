import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ReactModal from 'react-modal';


import HistoriaForm from './historia-form';

import datosapis from '../utils/apis';
import storage from '../utils/storage';

ReactModal.setAppElement(".app-wrapper");

export default class HistoriaModal extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfullFormSubmission = this.handleSuccessfullFormSubmission.bind(this);
    }

    handleSuccessfullFormSubmission(historia) {
        //console.log("historia desde historia-form", historia);
        alert(historia);
        //this.props.handleModalClose();
    }

    render() {
        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "70vw",
                height: "80vh"
              },
              overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.75)"
              }
        };

        return(
            <ReactModal
                style={this.customStyles}
                onRequestClose={() => {
                    this.props.handleModalClose();
                }}      
                isOpen={this.props.modalIsOpen}
            >
                <h2>{storage.get('Nombre')} va a agregar una historia al recuerdo {this.props.recuerdoItem.titulo}</h2>
                {/*<div>
                    <p>{storage.get('Nombre')}</p>
                    <p>{storage.get('Id')}</p>
                </div>*/}
                {/*<div>
                    {this.props.recuerdoItem.titulo}
                    {this.props.recuerdoItem.id}
                </div>*/}

                <HistoriaForm 
                    handleSuccessfullFormSubmission={this.handleSuccessfullFormSubmission}
                    fotoId={this.props.recuerdoItem.id}
                />
            </ReactModal>
        );
    }
}