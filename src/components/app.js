import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSpinner, faThumbsUp, faUser, faCommentDots, faTrash, faEdit, faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";

import NavegarMenu from './navegar/navegar-menu';
import Home from './paginas/home';
import Recuerdos from './paginas/recuerdos';
import RecuerdoDetalle from './recuerdo/recuerdo-detalle';
import MasVistos from './paginas/mas-vistos';
import RecuerdoManager from './paginas/recuerdo-manager';
import Login from './paginas/login';
import NoMatch from './paginas/no-match';

import storage from './utils/storage';

library.add(faSignOutAlt, faSpinner, faThumbsUp, faUser, faCommentDots, faTrash, faEdit, faHeart, faHeartCrack, faRegHeart);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
    storage.clear();
  }

  componentDidMount() {
    const valor = storage.get('Nombre');
    if (valor !== null) {
      this.setState({
        loggedInStatus: "LOGGED_IN"
      });
    }
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <div>
            <NavegarMenu
              loggedInStatus = {this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/recuerdos" component={Recuerdos} />
              <Route path="/b/:slug" component={RecuerdoDetalle} />
              <Route path="/mas_vistos" component={MasVistos} />
              <Route path="/recuerdo_manager" component={RecuerdoManager} />

              <Route 
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />

              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
