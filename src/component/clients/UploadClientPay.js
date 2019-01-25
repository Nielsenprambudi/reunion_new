import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import propTypes from 'prop-types';
import Compressor from "compressorjs";

import Spinner from '../layout/Spinner';

class UploadClientPay extends Component {
    state = {
        downloadFilePayUrl: "",
    }

    fileUpload = {
        file: null
    }


    fileSelectHandler = (event) => {
        this.fileUpload.file = event.target.files[0];
    }


    onSubmit = (e) => {
        e.preventDefault();

        const { client, firestore, firebase, history } = this.props;

        const file = this.fileUpload.file;

        let ref = firebase.storage().ref();
        const metadata = { contentType: file.type };


        new Compressor(file, {
            quality: 0.1,
            success(result) {
                const task = ref.child('images/payment/' + new Date().toISOString() + '.' +
                    file.type.split('/')[1]).put(result, metadata);

                task
                    .then(snapshot => {
                        console.log(snapshot.metadata)
                        client.PaymentPhotoFileUrl = snapshot.metadata.fullPath;
                    }).then(() => {
                        firestore.update({ collection: 'clients', doc: client.id }, client).then(() => history.push('/'));
                    })
                    .catch(console.error);
            }
        })
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onVerifyChange = (e) => this.setState({ [e.target.name]: e.target.checked });

    render() {

        const { client } = this.props;

        console.log(client);
        if (client) {

            return (

                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" /> ke Dashboard
                        </Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Masukkan Bukti Pembayaran</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <label htmlFor="firstName">Nama</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        disabled={true}
                                        value={client.firstName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        disabled={true}
                                        value={client.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        disabled={true}
                                        value={client.phone} />
                                </div>
                                <label htmlFor="fotoTransfer">Upload Bukti Pembayaran</label>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        autoComplete="Off"
                                        className="btn-default"
                                        name="fotoTransfer"
                                        onChange={this.fileSelectHandler}
                                        accept="image/*" />
                                </div>
                                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>


                </div>
            )

        } else {
            return <Spinner />
        }
    }
}

UploadClientPay.propTypes = {
    firestore: propTypes.object.isRequired,
    firebase: propTypes.object.isRequired,
    settings: propTypes.object.isRequired
}


export default compose(firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
]), firebaseConnect(),
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings: settings
    }))
)(UploadClientPay);
