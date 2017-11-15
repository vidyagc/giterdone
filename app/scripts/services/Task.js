(function() {
    function Task($firebaseArray) {
        var Task = {};
        var ref = firebase.database().ref().child("tasks");
        var tasks = $firebaseArray(ref);

        Task.tasksIncomplete = $firebaseArray(ref.orderByChild("status").equalTo("incomplete"));
        Task.tasksComplete = $firebaseArray(ref.orderByChild("status").equalTo("complete"));
        Task.tasksExpired = $firebaseArray(ref.orderByChild("status").equalTo("expired"));

        Task.currentTime = Math.round(Date.now() / 1000);

        setInterval(function(){
          var query = ref.orderByChild("date").endAt(Math.round(Date.now() / 1000) - 60);
          query.on("value", function(snapshot) {
            snapshot.forEach(function(snapshot) {
              if (snapshot.val().status == "incomplete") {
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
