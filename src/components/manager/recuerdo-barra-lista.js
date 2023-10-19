import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecuerdoBarraLista = (props) => {
    const recuerdoLista = props.data.map(recuerdoItem => {
        return (
            <div key={recuerdoItem.id} className="recuerdo-item-thumb">
                <div className="recuerdo-thumb-image">
                    <img src={recuerdoItem.url_foto} />
                </div>

                <div className="texto-contenedor">
                    <div className="titulo">{recuerdoItem.titulo}</div>

                    <div className="actions">
                        <a className="action-icon" onClick={() => props.handleEditClick(recuerdoItem)}>
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        <a className="action-icon-trash" onClick={() => props.handleDeleteClick(recuerdoItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                    
                </div>
            </div>
        )
    });

    return <div className="recuerdo-barra-lista-contenedor">{recuerdoLista}</div>;
};

export default RecuerdoBarraLista;