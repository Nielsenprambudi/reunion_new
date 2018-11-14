import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import propTypes from 'prop-types';
import Compressor from "compressorjs";


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


        const paymentTrans = this.state;
        const { firestore, firebase, history } = this.props;

        const file = this.fileUpload.file;


        let ref = firebase.storage().ref();
        const metadata = { contentType: file.type };


        new Compressor(file, {
            quality: 0.1,
            success(result) {
                const task = ref.child('images/payment/' + file.name).put(result, metadata);

                task
                    .then(snapshot => {
                        console.log(snapshot.metadata)
                        paymentTrans.downloadFilePayUrl = snapshot.metadata.fullPath;
                    }).then(() => {
                        firestore.add({ collection: 'clients' }, paymentTrans).then(() => history.push('/'));
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
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left" /> ke Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Masukkan Bukti Pembayaran</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="fotoTransfer">Upload Bukti Pembayaran</label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    autoComplete="Off"
                                    className="btn-default"
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

UploadClientPay.propTypes = {
    firestore: propTypes.object.isRequired,
    firebase: propTypes.object.isRequired,
    settings: propTypes.object.isRequired
}

export default compose(firestoreConnect(), firebaseConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(UploadClientPay);
