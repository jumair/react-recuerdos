import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";

import storage from '../utils/storage';

class NavegarMenu extends Component {
    constructor(props) {
        super(props);

        this.salir = this.salir.bind(this);
    }

    dynamicLink (route, linkText) {
        return (
            <div className="menu">
                <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
            </div>
        );
    }

    salir() {
        this.props.handleSuccessfulLogout();
        // Volvemos a la pagina de home.
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="navegar-contenedor">
                <div className="left-side">
                    <div className="menu">
                        <NavLink exact to="/" activeClassName="nav-link-active">Inicio</NavLink>
                    </div>

                    <div className="menu">
                        {this.props.loggedInStatus === "LOGGED_IN" ? (
                                <NavLink exact to="/recuerdos" activeClassName="nav-link-active">Recuerdos</NavLink>
                            ) : null
                        }
                    </div>

                    <div className="menu">
                        {this.props.loggedInStatus === "LOGGED_IN" ? (
                                <NavLink exact to="/mas_vistos" activeClassName="nav-link-active">Mas Vistos</NavLink>
                            ) : null
                        }
                    </div>

                    <div className="menu">
                        {this.props.loggedInStatus === "LOGGED_IN" ? (
                                <NavLink exact to="/recuerdo_manager" activeClassName="nav-link-active">Recuerdo Manager</NavLink>
                            ) : null
                        }
                    </div>
                </div>

                <div className="right-side">
                    <div className="menu">
                        {this.props.loggedInStatus === "LOGGED_IN" ? (
                            <div className="menu-salir">
                                <p className="menu-salir-p">
                                    {storage.get('Nombre')}
                                </p>
                                <a className="menu-salir-a" title="Salir" onClick={this.salir}>
                                    <FontAwesomeIcon icon="sign-out-alt" />
                                </a>
                            </div>
                            ) : <NavLink to="/login" activeClassName="nav-link-active">Log In</NavLink>
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(NavegarMenu);