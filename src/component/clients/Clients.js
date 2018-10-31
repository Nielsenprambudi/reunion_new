import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase'

import propTypes from 'prop-types'

import Spinner from "../layout/Spinner";

class Clients extends Component {
    state = {
        // totalOwed: null
    }

    static getDerivedStateFromProps(props, state) {
        const { clients } = props;

        if (clients) {
            // const total = clients.reduce((total, client) => {
            //     return total + parseFloat(client.balance.toString())
            // }, 0);

            // return { totalOwed: total }
        }

        return null;
    }

    render() {
        const { clients } = this.props;
        // const { totalOwed } = this.state;
        // const number = 3500;
        // console.log(number.toLocaleString('id'))
        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-8">
                            <h3>
                                {' '}
                                <i className="fas fa-users"></i> Daftar Alumni {' '}
                            </h3>
                        </div>
                        <div className="col-xs-6 col-md-4">
                            <h5 className="text-secondary">
                                Total Dana{' '}
                                <span className="text-primary">
                                    {/* Rp. {parseFloat(totalOwed).toFixed(2)} */}
                                    {/* Rp. {(totalOwed).toLocaleString('id')} */}
                                </span>
                            </h5>
                        </div>

                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    {/* <th>Saldo</th> */}
                                    <th>Verifikasi</th>
                                    <th>Detil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client.id}>
                                        <td>{client.firstName}</td>
                                        <td>{client.email}</td>
                                        {/* <td>Rp. {parseFloat(client.balance).toFixed(2).toLocaleString('id')}</td> */}
                                        {/* <td>Rp. {client.balance.toLocaleString('id')}</td> */}
                                        <td>
                                            <div className="form-group form-check">
                                                <input type="checkbox"
                                                    className="form-check-input"
                                                    id="verify"
                                                    name="verify"
                                                    checked={client.verify || false}
                                                    disabled
                                                />
                                                <label className="form-check-label" htmlFor="verify">Verifikasi</label>
                                            </div>
                                        </td>
                                        <td>
                                            <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                                                <i className="fas fa-arrow-circle-right"></i> Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            );
        } else {
            return (
                <Spinner />
            );
        }
    }
}

Clients.propTypes = {
    firestore: propTypes.object.isRequired,
    clients: propTypes.array
}

export default compose(
    firestoreConnect([{
        collection: 'clients'
    }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);
