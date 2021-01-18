import * as fb from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyAVwVbJ1gYKjJdk7lQoDgmqM7R2FlFmlIs",
    authDomain: "dyrfinna-b75f9.firebaseapp.com",
    databaseURL: "https://dyrfinna-b75f9-default-rtdb.firebaseio.com",
    projectId: "dyrfinna-b75f9",
    storageBucket: "dyrfinna-b75f9.appspot.com",
    messagingSenderId: "235219625672",
    appId: "1:235219625672:web:ad9444c2eed405743b67fd",
    measurementId: "G-M6K0361F0R"
};

export const firebase = !fb.apps || !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();