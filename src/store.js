import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingReducer from "./reducers/settingsReducer";



const firebaseConfig = {
    apiKey: "AIzaSyDoXDBW7i12Xkegmjw5dgZ6wVszTDhhNxk",
    authDomain: "reunion-d9d00.firebaseapp.com",
    databaseURL: "https://reunion-d9d00.firebaseio.com",
    projectId: "reunion-d9d00",
    storageBucket: "reunion-d9d00.appspot.com",
    messagingSenderId: "532721335626"
};

//react redux firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true// firestore for profile
}

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);


// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingReducer
});


if (localStorage.getItem('settings') == null) {
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }

    localStorage.setItem('settings', JSON.stringify(defaultSettings));

}

// Create store with reducers and initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        // window.__REDUX_DEVTOOLS_EXTENSION__ &&
        // window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;