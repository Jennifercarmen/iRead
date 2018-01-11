var config = {
  apiKey: "AIzaSyAcd1Itu9p6IF_xmRRVLo7Ro79Ek_YXGew",
  authDomain: "iread-47442.firebaseapp.com",
  databaseURL: "https://iread-47442.firebaseio.com",
  projectId: "iread-47442",
  storageBucket: "iread-47442.appspot.com",
  messagingSenderId: "816960626052"
};
firebase.initializeApp(config);

$('#start-login-js').on('click', googleLogin);


function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    user = result.user.email;
    console.log(user);
    location.href = "views/newsfeed.html";
  });
}
