
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyABtGUoDn3GvxXrfRA-bQKLrulCYCoHd_E",
    authDomain: "littlebrother-67da5.firebaseapp.com",
    databaseURL: "https://littlebrother-67da5.firebaseio.com",
    storageBucket: "littlebrother-67da5.appspot.com",
    messagingSenderId: "194837337033"
  };
  firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();



// This button clears the rows
$('#btnClearRows').on('click', function(){
  counter = 0;
  $("#rowSection").empty();
})
