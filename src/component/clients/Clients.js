import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect  } from 'react-redux-firebase'

import propTypes from 'prop-types'

import Spinner from "../layout/Spinner";
import {bindActionCreators} from 'redux';

import {search} from "../../actions/settingActions"

class Clients extends Component {

    state = {
        // totalOwed: null
    }

   constructor(props) {
       super(props);
       
       this.verifyInput = React.createRef();
   }     
    
    // componentDidMount() {
    //     const clients = this.props.clients;
    //     const verify = this.state

        // const newMount = clients.map((item) => {
        //     return {...item, verify}
        // })

        // return newMount
        // this.setState({
        //     newMount
        // })
    // }

    static getDerivedStateFromProps(props, state) {
        const {clients} = props
        // console.log(state.verify)
        // console.log(clients)

        if (clients ) {
            
            const client = clients.map((item) => {
                item.verify = "belum terverifikasi";
                return client
            })

            
            // const total = clients.reduce((total, client) => {
            //     return total + parseFloat(client.balance.toString())
            // }, 0);

            // return { totalOwed: total }
        }

        

        return null;

       

    }


    onSubmitVerify = (e) => {
        e.preventDefault();

        const {clients, firestore, history } = this.props;

        

        const clientFilter = clients.filter(client => client.verify !== "belum terverifikasi")
        console.log("filtering", clientFilter)

        const clientId = clientFilter.map((item) => {
            return item.id
        })
        console.log(clientId)

        // const {verify} = this.state;
        // const updateVerify = {
        //     verify: this.verifyInput.current.value
        // }

        firestore.update({ collection: 'clients' })
            .then(history.push('/'))
    }

    // onChange = (e) => {

    //     // console.log(index)
    //     console.log(this.props.clients)
    //     const clients = this.props.clients
    //     const newVar = clients.map((clientVer) => {
    //         clientVer.verify = e.target.value
    //         return newVar
    //     })

    //     // this.setState({ clients: newVar })
    //     // this.onSubmitVerify = this.onSubmitVerify.bind(this, index, e.target.value)
    //     // const verify = e.target.value
    //     // console.log(clients)
    //     // const newVar = clients.map((clientVer) => {
    //     //     return {...clientVer, verify: e.target.value}
    //     // })
        
    //     // this.setState(clients[index], verify)
    //     // console.log(newVar)

    // };

    onChange(index, value) {
        const {clients} = this.props
        const newState = clients.map((item, i) => {
            if (i === index) {
                item.verify = value
            } 
            return item;
        });
        console.log(newState)

        // this.setState({
        //     clients: newState
        // })

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
                        <form onSubmit ={this.onSubmitVerify}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-8">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Cari Alumni" onChange={(e) => search(e.target.value)} value={value} />
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <input type="submit" value="Submit Verifikasi" className="btn btn-primary btn-block" />
                                    {/* <input type="submit" onClick={this.onSubmitVerify} value="Submit Verifikasi" className="btn btn-primary btn-block"/> */}
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
                                            <td>{index + 1}</td>
                                            <td>{client.firstName}</td>
                                            <td>{client.email}</td>
                                            {/* <td>Rp. {parseFloat(client.balance).toFixed(2).toLocaleString('id')}</td>
                                            <td>Rp. {client.balance.toLocaleString('id')}</td> */}
                                            <td>
                                                <select className="form-control" name="verify" onChange={(e) => this.onChange(index, e.target.value)} defaultValue={client.verify} ref={this.verifyInput} >
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
                        </form>
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
    clients: propTypes.array,
    firebase: propTypes.object.isRequired
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
    // firestoreConnect(props  =>  
    // [{
    //     collection: 'clients', storeAs: "client", doc: props.match.params.id
    // }]), firebaseConnect(),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
    // connect(({ firestore: { ordered }, settings }, props) => ({
    //     client: ordered.client && ordered.client[0],
    //     settings: settings
    // }))
)(Clients);
