import React from 'react'
import classnames from "classnames";
import propTypes from 'prop-types'


const Alert = props => {

    const { message, messageType } = props;

    return (
        <div className={classnames('alert', {
            'alert-success': messageType === 'success',
            'alert-danger': messageType === 'error',
        })}>
            {message}
        </div>
    )
}

Alert.propTypes = {
    message: propTypes.string.isRequired,
    messageType: propTypes.string.isRequired
}


export default Alert;