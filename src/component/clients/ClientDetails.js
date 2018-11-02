import React, { Component } from "react";
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import propTypes from "prop-types";

import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: "0"
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  //update
  balanceSubmit = e => {
    e.preventDefault();

    console.log(this.state.balanceUpdateAmount);
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    }
    //update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
  };


  //delete client
  onDeleteClick = () => {
    const { client, firestore, history } = this.props;


    firestore.delete({ collection: 'clients', doc: client.id })
      .then(() => history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    const verifyStatement = "belum terverifikasi"

    let balanceForm = "";

    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount.toLocaleString('id')}
              onChange={this.onChange}
            />
            <div className="input-group-append"><input type="submit" value="Update" className="btn btn-outline-dark" /></div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      const clientVer = client.verify 
      const statement = (clientVer === verifyStatement)
      return (
        <div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-8">
              <Link className="btn btn-link" to="/">
                <i className="fas fa-arrow-circle-left" /> Kembali ke Dashboard
              </Link>
            </div>

            <div className="col-xs-6 col-md-4">
              <div className="btn-group">
                <Link className="btn btn-dark" to={`/client/edit/${client.id}`}>
                  Edit
                </Link>{" "}
                <button onClick={this.onDeleteClick} className="btn btn-danger">Hapus</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              {client.firstName} {client.lastName}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    {/* Saldo:{" "}
                    <span className={classnames({
                      "text-danger": client.balance > 0,
                      "text-success": client.balance === "0"
                    })}>
                      Rp. {client.balance.toLocaleString('id')}
                    </span>{" "} */}
                    <small>
                      <a href="#!" onClick={() =>
                        this.setState({
                          showBalanceUpdate: !this.state.showBalanceUpdate
                        })
                      }>
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {/* @todo Balance Form */}
                  {balanceForm}
                </div>
              </div>
              <hr />
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
                {/* <li className="list-group-item">
                  Jumlah Tiket : {client.ticketAmount}
                </li> */}
                <li className="list-group-item">
                  {/* if ( {client.verify !== "belum terverifikasi"} ) {
                    <div className="alert alert-success" role="alert">
                        Verifikasi Sukses
                    </div>
                  } else {
                    <div className="alert alert-danger" role="alert">
                        Belum terverifikasi
                    </div>
                  } */}
                  {statement ?  
                    <div className="alert alert-success" role="alert">
                      <h3>Verifikasi Sukses</h3>
                    </div>
                    : 
                    <div className="alert alert-danger" role="alert">
                       <h3>Belum terverifikasi</h3>
                    </div>
                  }
                </li>
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

ClientDetails.propTypes = {
  firestore: propTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
