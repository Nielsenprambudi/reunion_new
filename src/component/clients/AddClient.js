import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase'

import propTypes from 'prop-types'

class AddClient extends Component {
    state = {
        firstName: "",
        address: "",
        lastClass: "",
        email: "",
        phone: "",
        balance: "",
        ticketAmount: "",
        verify: false
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newClient = this.state;
        console.log(this.props);
        const { firestore, history } = this.props;

        if (newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'));

    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onVerifyChange = (e) => this.setState({ [e.target.name]: e.target.checked});

    render() {
        const { disableBalanceOnAdd } = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/login" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left" /> ke Login
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Tambah Pendaftaran</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Nama Pendaftar</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Alamat</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastClass">Kelas Terakhir</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastClass"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.lastClass}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telepon / HP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    minLength="10"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketAmount">Jumlah tiket</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ticketAmount"
                                    onChange={this.onChange}
                                    value={this.state.ticketAmount}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ticketAmount">Saldo yang harus di bayar</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ticketAmount"
                                    onChange={this.onChange}
                                    value={this.state.balance}
                                    disabled={disableBalanceOnAdd}
                                    autoComplete="Off" />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" 
                                    className="form-check-input"
                                    id="verify"
                                    name="verify"
                                    value={this.state.verify || false}
                                    onChange={this.onVerifyChange}
                                    />
                                <label className="form-check-label" htmlFor="verify">Verifikasi</label>
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>


            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: propTypes.object.isRequired,
    settings: propTypes.object.isRequired
}

export default compose(firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);
