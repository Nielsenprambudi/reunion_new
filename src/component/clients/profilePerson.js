import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import propTypes from "prop-types";

import Spinner from "../layout/Spinner";

class ProfilePerson extends Component {

  render() {
    const { client } = this.props;
    console.log('test');
    console.log("variable :", client)
    if (client) {
      return (
        <div>
          <div className="card">
            <div className="card-header">
              <h1>{client.firstName}</h1>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  Alamat : {client.address}
                </li>
                <li className="list-group-item">
                  Kelas Terakhir : {client.lastClass}
                </li>
                <li className="list-group-item">
                  Email : {client.email}
                </li>
                <li className="list-group-item">
                  Telepon/HP : {client.phone}
                </li>
                <li className="list-group-item">
                  Total tiket dewasa : {client.ticketAmountDewasa}
                </li>
                {
                  (client.ticketAmountAnak === 0) ? null :
                  <li className="list-group-item">
                    Total tiket anak : {client.ticketAmountAnak}
                  </li>
                }
              </ul>
            </div>
          </div>
        </div >
      );
    } else {
      return <Spinner />;
    }
  }
}

ProfilePerson.propTypes = {
  firestore: propTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ProfilePerson);
