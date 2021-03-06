import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./component/layout/AppNavbar";
import Dashboard from "./component/layout/Dashboard";

import AddClient from "./component/clients/AddClient";
import EditClient from "./component/clients/EditClient";
import ClientDetails from "./component/clients/ClientDetails";
import UploadClientPay from "./component/clients/UploadClientPay";
import AddClientFam from "./component/clients/AddClientFam";
import ThankYou from "./component/clients/ThankYou";
import ProfilePerson from "./component/clients/profilePerson";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Settings from "./component/settings/Settings";
import ClientsPaymentApproval from './component/clients/ClientsPaymentApproval';
import ClientsVerifyList from './component/clients/ClientsVerifyList';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                <Route exact path="/Client/Verify/:id" component={UserIsNotAuthenticated(UploadClientPay)} />

                <Route exact path="/Client/Payment/Verify" component={UserIsAuthenticated(ClientsPaymentApproval)} />
                <Route exact path="/List/VerifyClient" component={UserIsAuthenticated(ClientsVerifyList)} />

                <Route exact path="/Client/Verify/:id/child" component={UserIsNotAuthenticated(AddClientFam)} />
                <Route exact path="/Person/:id" component={UserIsNotAuthenticated(ProfilePerson)} />
                <Route exact path="/thankyou" component={UserIsNotAuthenticated(ThankYou)} />
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
