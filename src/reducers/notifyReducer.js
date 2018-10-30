import { NOTIFY_USER } from "../actions/types";

const initialState = {
    message: null,
    messageType: null
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case NOTIFY_USER: {
            return {
                ...state,
                message: actions.message,
                messageType: actions.messageType
            }
        }
        default:
            return state
    }
}