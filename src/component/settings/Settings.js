import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
import { connect } from "react-redux";
import {
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
} from "../../actions/settingActions";


class Settings extends Component {
    disableBalanceOnAddChange = () => {
        const { setDisableBalanceOnAdd } = this.props;
        setDisableBalanceOnAdd();
    }


    disableBalanceOnEditChange = () => {
        const { setDisableBalanceOnEdit } = this.props;
        setDisableBalanceOnEdit();
    }



    allowRegistrationOnChange = () => {
        const { setAllowRegistration } = this.props;
        setAllowRegistration();
    }



    render() {
        const { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration } = this.props.settings;

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i> Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Pengaturan</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="">Ijinkan Pendaftaran</label> {' '}
                                <input type="checkbox"
                                    name="allowRegistration"
                                    checked={!!allowRegistration}
                                    onChange={this.allowRegistrationOnChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">NonAktifkan Saldo Ketika Memasukkan</label> {' '}
                                <input type="checkbox"
                                    name="disableBalanceOnAdd"
                                    checked={!!disableBalanceOnAdd}
                                    onChange={this.disableBalanceOnAddChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">NonAktifkan Saldo ketika Mengedit</label> {' '}
                                <input type="checkbox"
                                    name="disableBalanceOnEdit"
                                    checked={!!disableBalanceOnEdit}
                                    onChange={this.disableBalanceOnEditChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Settings.propTypes = {
    settings: propTypes.object.isRequired,
    setDisableBalanceOnAdd: propTypes.func.isRequired,
    setDisableBalanceOnEdit: propTypes.func.isRequired,
    setAllowRegistration: propTypes.func.isRequired
}

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}), { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration })(Settings);