(function() {
    function HistoryCtrl($state, Task) {

        this.tasksComplete = Task.tasksComplete;
        this.tasksExpired = Task.tasksExpired;
        this.tasksIncomplete = Task.tasksIncomplete;
        var ref = firebase.database().ref("tasks");

        this.currentTime = Task.currentTime;
        var expireTime = Task.currentTime-60;

        this.deleteTask = function(taskid) {
            firebase.database().ref('tasks/' + taskid.$id).remove();
        }

        this.deleteAllComplete = function() {
          ref.orderByChild("status").equalTo("complete").on("child_added", function(snapshot) {
            snapshot.ref.remove();
          });
        }

        this.deleteAllExpired = function() {
          ref.orderByChild("status").equalTo("expired").on("child_added", function(snapshot) {
            snapshot.ref.remove();
          });
        }

        // this.deleteAllExpired = function() {
        //   ref.orderByChild("date").endAt(Math.round(Date.now() / 1000) - 60).on("child_added", function(snapshot) {
        //     snapshot.ref.remove();
        //   });
        // }

  }

    angular
        .module('giterdone')
        .controller('HistoryCtrl', ['$state', 'Task', HistoryCtrl], );
})();
