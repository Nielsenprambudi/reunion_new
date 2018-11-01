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
        ticketAmount: "",
        downloadFileUrl: "",
    }

    fileUpload = {
        file: null
    }


    fileSelectHandler = (event) => {
        this.fileUpload.file = event.target.files[0];
    }


    onSubmit = (e) => {
        e.preventDefault();


        const newClient = this.state;
        const { firestore, firebase, history } = this.props;

        const file = this.fileUpload.file;


        let ref = firebase.storage().ref();
        const metadata = { contentType: file.type };


        new Compressor(file, {
            quality: 0.1,
            success(result) {
                const task = ref.child('images/' + file.name).put(result, metadata);

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
                                <label htmlFor="ticketAmount">Jumlah Tiket</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="ticketAmount"
                                    minLength="10"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.ticketAmount}
                                    autoComplete="Off" />
                            </div>
                            <label htmlFor="fotoPendaftar">Upload Foto</label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    autoComplete="Off"
                                    name="file"
                                    onChange={this.fileSelectHandler}
                                    accept="image/*" />
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
    firebase: propTypes.object.isRequired,
    settings: propTypes.object.isRequired
}

export default compose(firestoreConnect(), firebaseConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);
