import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase'

import propTypes from 'prop-types'

import Spinner from "../layout/Spinner";
import {bindActionCreators} from 'redux';

import {search} from "../../actions/settingActions"

class Clients extends Component {

    state = {
        // totalOwed: null
        verify: "belum terverifikasi"
    }

   constructor(props) {
       super(props);
       this.state = {
           verify: "belum terverifikasi"
       }
   }     
    

    static getDerivedStateFromProps(props, state) {
        // console.log(state.verify)
        const { clients } = props;
        // console.log(clients)

        if (clients ) {
            
            
            // const total = clients.reduce((total, client) => {
            //     return total + parseFloat(client.balance.toString())
            // }, 0);

            // return { totalOwed: total }
        }

        // const newVarCli = clients.map((item) => {
        //     return {...item, verify: "belum terverifikasi"}
        // })

        return null;
       

    }

    // componentDidMount() {
    //     console.log(this.props.clients)
    //     var clients = this.props.clients;
    //     if (clients === !undefined) {
    //         const newVarCli = clients.map((item) => {
    //             return {...item, verify: "belum terverifikasi"}
    //         })
    //         return newVarCli;
    //     }

        
    // }


    onSubmitVerify = (index, e) => {
        // e.preventDefault();

        const {client, firestore } = this.props;
        // const {verify} = this.state;

        const updateVerify = {
            ...client[index],
            verifikasi: e
        }
        firestore.update({ collection: 'clients', doc: client.id }, updateVerify)
    }

    onChange = (index, e) => {

        // console.log(index)

        this.setState({ [e.target.name]: e.target.value })
        this.onSubmitVerify = this.onSubmitVerify.bind(this, index, e.target.value)
        // const { clients } = this.props;
        // const verify = e.target.value
        // console.log(clients)
        // const newVar = clients.map((clientVer) => {
        //     return {...clientVer, verify: e.target.value}
        // })
        
        // this.setState(clients[index], verify)
        // console.log(newVar)

    };

    handleChange(index, dataType, value) {
        const {clients} = this.props
        const newState = clients.map((item, i) => {
            if (i === index) {
                return {...item, [dataType]: value};
            }
            return item;
        });

        this.setState({
            clients: newState
        })
    }

    render() {
        const { clients, search, value } = this.props;
        // const { verify } = this.state;
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
                    <br></br>
                    <div className="table-responsive">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-8">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Cari Alumni" onChange={(e) => search(e.target.value)} value={value} />
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    {/* <input type="submit"  className="btn btn-primary btn-block" /> */}
                                    <input type="submit" onClick={this.onSubmitVerify} value="Submit Verifikasi" className="btn btn-primary btn-block"/>
                                </div>
                            </div>
                            <br></br>
                            <table className="table table-striped">
                                <thead className="thead-inverse">
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        {/* <th>Saldo</th> */}
                                        <th>Verifikasi</th>
                                        <th>Detil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client, index) => (
                                        <tr key={client.id}>
                                            <td>{index}</td>
                                            <td>{client.firstName}</td>
                                            <td>{client.email}</td>
                                            {/* <td>Rp. {parseFloat(client.balance).toFixed(2).toLocaleString('id')}</td> */}
                                            {/* <td>Rp. {client.balance.toLocaleString('id')}</td> */}
                                            <td>
                                                <select className="form-control" name="verify" onChange={(e) => this.handleChange(index, 'ver', e.target.value)} >
                                                    <option value="belum terverifikasi">Belum Terverifikasi</option>
                                                    <option value="terverifikasi">Terverifikasi</option>
                                                </select>
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

function mapStateToProps({clients}) {
    return {value: clients}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({search}, dispatch);
}
  

export default compose(
    firestoreConnect([{
        collection: 'clients'
    }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    })),
    connect(mapStateToProps, mapDispatchToProps)
)(Clients);
