var warm = new Firebase('https://warm-food-inventory.firebaseapp.com/');
var activeVisitors = warm.child('activeVisitors');

activeVisitors.push({
  path: window.location.pathname,
  arrivedAt: Firebase.ServerValue.TIMESTAMP,
  userAgent: navigator.userAgent
});

var totalVisitors = warm.child('totalVisitors');
totalVisitors.transaction(function (currentData) {
  return currentData + 1;
});

var visitor = {
  path: window.location.pathname,
  arrivedAt: Firebase.ServerValue.TIMESTAMP,
  userAgent: navigator.userAgent
};

var activeVisitorRef = activeVisitors.push(visitor, function () {
  activeVisitors.child(visitorId).once('value', function (snapshot) {
    visitor.arrivedAt = snapshot.child('arrivedAt').val();
    var pastVisitors = warm.child('pastVisitors');
    visitor.leftAt = Firebase.ServerValue.TIMESTAMP;
    pastVisitors.child(visitorId).onDisconnect().set(visitor);
  });
});

var visitorId = activeVisitorRef.name();
