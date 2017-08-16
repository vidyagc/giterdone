(function() {
    function Task($firebaseArray) {
        var Task = {};
        var ref = firebase.database().ref().child("tasks");
        var tasks = $firebaseArray(ref);

        Task.tasksIncomplete = $firebaseArray(ref.orderByChild("status").equalTo("incomplete"));
        Task.tasksComplete = $firebaseArray(ref.orderByChild("status").equalTo("complete"));
        Task.tasksExpired = $firebaseArray(ref.orderByChild("date").endAt(Math.round(Date.now() / 1000) - 10));

        Task.currentTime = Math.round(Date.now() / 1000);

        return Task;
    }

    angular
        .module('giterdone')
        .factory('Task', ['$firebaseArray', Task]);
})();
