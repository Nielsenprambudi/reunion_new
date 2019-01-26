import React, { Component } from 'react';
import './ThankYou.css'
// import { Link } from "react-router-dom";

// import { compose } from "redux";
// import { connect } from "react-redux";
// import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

// import propTypes from 'prop-types';
// import Compressor from "compressorjs";


class ThankYou extends Component {
    // state = {
    //     firstName: "",
    //     address: "",
    //     lastClass: "",
    //     email: "",
    //     phone: "",
    //     ticketAmountDewasa: 0,
    //     ticketAmountAnak: 0,
    //     PhotoFileUrl: "",
    //     totalAmount: 0,
    //     verify: false,
    //     verifyPayment: false,
    //     PaymentPhotoFileUrl: '',
    //     QRCodeFileUrl: '',
    //     downloadFileUrl: "",
    // }

    // fileUpload = {
    //     file: null
    // }


    // fileSelectHandler = (event) => {
    //     this.fileUpload.file = event.target.files[0];
    // }

    // amountChange = (event) => {

    //     var totalMount = (parseFloat(event.target.value) * 350000);
    //     this.setState({
    //         ticketAmountDewasa: event.target.value,
    //         totalAmount: new Intl.NumberFormat('EN-ID', { maximumSignificantDigits: 3 }).format(totalMount)
    //     });

    //     console.log("total amount value on change",
    //         new Intl.NumberFormat('EN-ID', { maximumSignificantDigits: 3 }).format(totalMount));
    // }

    // onSubmit = (e) => {
    //     e.preventDefault();


    //     const newClient = this.state;
    //     const { firestore, firebase, history } = this.props;

    //     const file = this.fileUpload.file;


    //     let ref = firebase.storage().ref();
    //     const metadata = { contentType: file.type };

    //     // console.log('images/' + new Date().toISOString() + '.' + file.type.split('/')[1], file);
    //     new Compressor(file, {
    //         quality: 0.1,
    //         success(result) {
    //             const task =
    //                 ref.child('images/' + new Date().toISOString() + '.' +
    //                     file.type.split('/')[1]).put(result, metadata);

    //             task
    //                 .then(snapshot => {
    //                     console.log(snapshot.metadata)
    //                     newClient.downloadFileUrl = snapshot.metadata.fullPath;
    //                 }).then(() => {
    //                     firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'));
    //                 })
    //                 .catch(console.error);
    //         }
    //     })
    // }

    // onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    // onVerifyChange = (e) => this.setState({ [e.target.name]: e.target.checked });

    render() {
        const { history } = this.props;
        // const totalAmount = 0.00;
        // const emptyName = this.state.firstName;
        // const emptyAddress = this.state.address;
        // const emptyEmail = this.state.email;
        // const emptyPhone = this.state.phone;

        return (

            <div className="border-radius" >
                {/* <div className="jumbotron">
                    <img src="https://firebasestorage.googleapis.com/v0/b/reuni-80594.appspot.com/o/Assets%2FPPPK_Petra_Logo.png?alt=media&token=49aaefe0-1251-48ce-a352-6182f8dde2e0" alt="Logo Petra"/>
                    <p>
                        Terima kasih telah melakukan pembayaran, selanjutnya silahkan menunggu e-mail pemberitahuan dari administrator
                    </p>
                </div> */}
                <nav className="petra-navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">
                                <img alt="Logo Petra" src="https://firebasestorage.googleapis.com/v0/b/reuni-80594.appspot.com/o/Assets%2FPPPK_Petra_Logo.png?alt=media&token=49aaefe0-1251-48ce-a352-6182f8dde2e0" />
                            </a>
                        </div>
                    </div>
                </nav>
                <div className="petra-container text-center">
                    <div className="card-body">
                        <h3 className="card-title">Terima Kasih</h3>
                        <p className="card-text">Selanjutnya silahkan menunggu e-mail pemberitahuan dari administrator</p>
                    </div>
                    <footer>
                        <p>SMA Kr. Petra Angkatan '94</p>
                        <input type="button" className="btn btn-green" value="Kembali" onClick={() => history.push('/')} />
                    </footer>
                </div>



            </div>
        )
    }
}

// ThankYou.propTypes = {
//     firestore: propTypes.object.isRequired,
//     firebase: propTypes.object.isRequired,
//     settings: propTypes.object.isRequired
// }

export default ThankYou;
