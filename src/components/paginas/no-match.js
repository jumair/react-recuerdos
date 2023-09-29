import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
    return (
        <div>
            <h2>No se pudo encontrar la página</h2>
            <Link to="/">Inicio</Link>
        </div>
    );
}