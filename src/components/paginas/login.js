import React, { Component } from "react";
import axios from 'axios';
import md5 from 'md5';

import storage from '../utils/storage';
import datosapis from '../utils/apis';

import imgLogo from "../../../static/assets/images/logos/camara.png";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleSubmit(event) {
        const urlApi = datosapis.urlapi + "auth";

        axios
          .post(urlApi,  
          {
            user: {
                nombre: this.state.usuario,
                password: md5(this.state.password)
            }
            
          })
          .then(response => {
            if (response.data.length === 0) {
                this.setState({
                    errorText: "¡¡¡ Usuario o Password Incorrectos !!!"
                });
                this.props.handleUnsuccessfulLogin();
            } else if (response.data[0].auth === 'OK') {
                storage.set('Id', response.data[0].id);
                storage.set('Nombre', response.data[0].nombre);

                this.props.history.push('/');
                this.props.handleSuccessfulLogin();
            }
          })
          .catch(error => {
            this.setState({
                errorText: "¡¡¡ Se produjo un error !!!"
            });
            this.props.handleUnsuccessfulLogin();
          });

          event.preventDefault();
    }

    render() {
        storage.clear();

        return (
            <div className="login">
                <div className="login-contenedor">
                    <div className="login-contenedor-img">
                        <img src={imgLogo} />
                    </div>
                    <div className="login-contenedor-texto">
                        <h2>Log in</h2>
                    </div>
                    <div className="login-contenedor-error">{this.state.errorText}</div>
                    <form className="login-contenedor-form" onSubmit={this.handleSubmit}>
                        <div className="one-column">
                            <input
                                type="text"
                                name="usuario"
                                placeholder="Usuario"
                                value={this.state.usuario}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="one-column">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <button className="btn" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}