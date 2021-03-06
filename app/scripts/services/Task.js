(function() {
    function Task($firebaseArray) {
        var Task = {};
        var ref = firebase.database().ref().child("tasks");

        Task.tasksIncomplete = $firebaseArray(ref.orderByChild("status").equalTo("incomplete"));
        Task.tasksComplete = $firebaseArray(ref.orderByChild("status").equalTo("complete"));
        Task.tasksExpired = $firebaseArray(ref.orderByChild("status").equalTo("expired"));

        setInterval(function(){
          var query = ref.orderByChild("status").equalTo('incomplete');
          query.on("value", function(snapshot) {
            snapshot.forEach(function(snapshot) {
              if (snapshot.val().date < (Math.round(Date.now() / 1000) - 89)) {
                snapshot.ref.update({status: 'expired'})
              }
            });
          });
        }, 1000)

        return Task;
    }

    angular
        .module('giterdone')
        .factory('Task', ['$firebaseArray', Task]);
})();
