import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'

import propTypes from 'prop-types'
import Spinner from '../layout/Spinner';


class EditClient extends Component {


    constructor(props) {
        super(props);

        this.firstNameInput = React.createRef();
        this.addressInput = React.createRef();
        this.lastClassInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    onSubmit = e => {
        e.preventDefault();

        const { client, firestore, history } = this.props;
        const UpdClient = {
            firstName: this.firstNameInput.current.value,
            address: this.addressInput.current.value,
            lastClass: this.lastClassInput.current.value,
            phone: this.phoneInput.current.value,
            email: this.emailInput.current.value
        }

        firestore.update({ collection: 'clients', doc: client.id }, UpdClient)
            .then(history.push('/'));
    }

    fileimage = {
        file: ""
    }

    render() {
        const { client, firebase } = this.props;
        if (client) {
            const url = client.downloadFileUrl;
            const ref = firebase.storage().ref();
            const task = ref.child(url);

            task.getDownloadURL().then((url) => {
                document.querySelector('img').src = url;
            }).catch((error) => {
                console.log(error)
            })

            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" /> Kembali ke Dashboard
                        </Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Edit Pendaftaran</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">Nama Depan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        minLength="2"
                                        required
                                        ref={this.firstNameInput}
                                        defaultValue={client.firstName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Alamat</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        required
                                        ref={this.addressInput}
                                        defaultValue={client.address} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastClass">Kelas Terakhir</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastClass"
                                        required
                                        ref={this.lastClassInput}
                                        defaultValue={client.lastClass} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        ref={this.emailInput}
                                        defaultValue={client.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Telepon/HP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        minLength="10"
                                        required
                                        ref={this.phoneInput}
                                        defaultValue={client.phone} />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="fotoPendaftar">Foto</label>
                                    <img alt="altimage" height="125px" width="120px" />
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
            );
        } else {
            return <Spinner />
        }
    }
}

EditClient.propTypes = {
    firestore: propTypes.object.isRequired,
    settings: propTypes.object.isRequired,
    firebase: propTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: "clients", storeAs: "client", doc: props.match.params.id }
    ]), firebaseConnect(),
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings: settings
    }))
)(EditClient);
