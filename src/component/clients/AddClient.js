import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import propTypes from 'prop-types';
import Compressor from "compressorjs";


class AddClient extends Component {
    state = {
        firstName: "",
        address: "",
        lastClass: "",
        email: "",
        phone: "",
        ticketAmountDewasa: 0,
        ticketAmountAnak: 0,
        PhotoFileUrl: "",
        totalAmount: 0,
        verify: false,
        verifyPayment: false,
        PaymentPhotoFileUrl: '',
        QRCodeFileUrl: '',
        downloadFileUrl: "",
    }

    fileUpload = {
        file: null
    }


    fileSelectHandler = (event) => {
        this.fileUpload.file = event.target.files[0];
    }

    amountChange = (event) => {

        var totalMount = (parseFloat(event.target.value) * 350000);
        this.setState({
            ticketAmountDewasa: event.target.value,
            totalAmount: new Intl.NumberFormat('EN-ID', { maximumSignificantDigits: 3 }).format(totalMount)
        });

        console.log("total amount value on change",
            new Intl.NumberFormat('EN-ID', { maximumSignificantDigits: 3 }).format(totalMount));
    }

    onSubmit = (e) => {
        e.preventDefault();


        const newClient = this.state;
        const { firestore, firebase, history } = this.props;

        const file = this.fileUpload.file;


        let ref = firebase.storage().ref();
        const metadata = { contentType: file.type };

        // console.log('images/' + new Date().toISOString() + '.' + file.type.split('/')[1], file);
        new Compressor(file, {
            quality: 0.1,
            success(result) {
                const task =
                    ref.child('images/' + new Date().toISOString() + '.' +
                        file.type.split('/')[1]).put(result, metadata);

                task
                    .then(snapshot => {
                        console.log(snapshot.metadata)
                        newClient.downloadFileUrl = snapshot.metadata.fullPath;
                    }).then(() => {
                        firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'));
                    })
                    .catch(console.error);
            }
        })
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onVerifyChange = (e) => this.setState({ [e.target.name]: e.target.checked });

    render() {
        const totalAmount = 0.00;
        const emptyName = this.state.firstName;
        const emptyAddress = this.state.address;
        const emptyEmail = this.state.email;
        const emptyPhone = this.state.phone;

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
                                {emptyName ? <sub></sub> : <sub className="text-danger">Nama tidak boleh kosong</sub>}
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
                                {emptyAddress ? <sub></sub> : <sub className="text-danger">Alamat tidak boleh kosong</sub>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastClass">Kelas Terakhir</label>
                                {/* <input
                                    type="text"
                                    className="form-control"
                                    name="lastClass"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.lastClass}
                                    autoComplete="Off" /> */}
                                <select
                                    className="form-control"
                                    name="lastClass"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.lastClass}
                                    autoComplete="Off" >
                                    <option value="3A11">3A11</option>
                                    <option value="3A12">3A12</option>
                                    <option value="3A13">3A13</option>
                                    <option value="3A14">3A14</option>
                                    <option value="3A21">3A21</option>
                                    <option value="3A22">3A22</option>
                                    <option value="3A31">3A31</option>
                                    <option value="3A32">3A32</option>
                                    <option value="3A33">3A33</option>
                                    <option value="3A34">3A34</option>
                                </select>
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
                                {emptyEmail ? <sub></sub> : <sub className="text-danger">Email tidak boleh kosong</sub>}
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
                                {emptyPhone ? <sub></sub> : <sub className="text-danger">Telepon / HP tidak boleh kosong</sub>}
                            </div>

                            <h3>Jumlah Tiket</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="ticketAmountDewasa">Dewasa</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="ticketAmountDewasa"
                                        minLength="10"
                                        required
                                        onChange={this.amountChange}
                                        value={this.state.ticketAmountDewasa}
                                        autoComplete="Off" />
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="ticketAmountAnak">Anak</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="ticketAmountAnak"
                                            onChange={this.onChange}
                                            value={this.state.ticketAmountAnak}
                                            autoComplete="Off" />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="totalAmount">Saldo yang harus di bayar</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="totalAmount"
                                    required
                                    value={this.state.totalAmount}
                                    disabled={true}
                                    autoComplete="Off" />
                            </div>
                            <label htmlFor="fotoPendaftar">Upload Foto</label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    autoComplete="Off"
                                    className="btn-default"
                                    name="file"
                                    onChange={this.fileSelectHandler}
                                    accept="image/*" />
                            </div>

                            <input type="submit" value="Submit" disabled={!this.state.firstName && !this.state.email && !this.state.address && !this.state.phone} className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>


            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: propTypes.object.isRequired,
    firebase: propTypes.object.isRequired,
    settings: propTypes.object.isRequired
}

export default compose(firestoreConnect(), firebaseConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);
