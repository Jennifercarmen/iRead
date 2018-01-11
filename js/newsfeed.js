var config = {
  apiKey: "AIzaSyAcd1Itu9p6IF_xmRRVLo7Ro79Ek_YXGew",
  authDomain: "iread-47442.firebaseapp.com",
  databaseURL: "https://iread-47442.firebaseio.com",
  projectId: "iread-47442",
  storageBucket: "iread-47442.appspot.com",
  messagingSenderId: "816960626052"
};
firebase.initializeApp(config);

//eventos
$('#submit-js').on('click', post);
$('#href-js').on('click', post);
$('#logout-js').on('click', logout);
function post(event) {
  event.preventDefault();
  var $content = $('#content-post-js').val();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      writeUserPost(user.uid, user.displayName, $content);
      $('#content-post-js').val('');
      $('#content-post-js').focus();
    }
  });
}

function writeUserPost(userId, name, content) {
  firebase.database().ref('posts').push({
    uid: userId,
    author: name,
    content: content
  });
}
function logout() {
  
  firebase.auth().signOut()
    .then(function (result) {
      console.log('Te has desconectado correctamente');
      location.href = "../index.html";
    })
    .catch(function (error) {
      console.log(`Error ${error.code}: ${error.message}`)
    })
}

function sessionActive() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('sesion activa de newsfeed');
      name = user.displayName;
      photoUrl = user.photoURL;
      $('#name-js').text(name);
      $('#photoUrl-js').attr("src", photoUrl);
      console.log(user);
      writeUserData(user.uid, name, user.email, photoUrl)
    } else {
      location.href = "../index.html";
    }
  });
}
sessionActive();

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}




recoverUserPost();

function recoverUserPost() {
  firebase.database().ref('posts').on('value', function(snapshot) {
    snapshot.forEach(function(e) {
      var element = e.val();
      var author = element.author;
      var content = element.content;
    $('#all-post-js').append('<div><p>' + author + '</p>' + '<p>' + content + '</p')

  });
})
}