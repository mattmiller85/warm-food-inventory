// Get a reference to the database service
var database = firebase.database();

return firebase.database().ref('/warm-food-inventory').once('value').then(function(snapshot) {
  var productname = snapshot.val().username;
  // ...
});
