import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "Minha apiKey",
    authDomain: "eventos-5fca6.firebaseapp.com",
    projectId: "eventos-5fca6",
    storageBucket: "eventos-5fca6.appspot.com",
    messagingSenderId: "367606000795",
    appId: "1:367606000795:web:20903f73d9226cd9ddea3e"
  };

  export default firebase.initializeApp(firebaseConfig);

