(function() {
    function HistoryCtrl($state, Task) {

        this.tasksComplete = Task.tasksComplete;
        this.tasksExpired = Task.tasksExpired;
        this.tasksIncomplete = Task.tasksIncomplete;
        var ref = firebase.database().ref().child("tasks");

        this.deleteTask = function(taskid) {
            firebase.database().ref('tasks/' + taskid.$id).remove();
        }
        var removeSnap = function(snapshot) {
          snapshot.ref.remove();
        }

        this.deleteAll = function() {
          ref.orderByChild("status").equalTo("complete").on("child_added", removeSnap);

          ref.orderByChild("status").equalTo("expired").on("child_added", removeSnap);

          ref.off("child_added", removeSnap);
        }

  }

    angular
        .module('giterdone')
        .controller('HistoryCtrl', ['$state', 'Task', HistoryCtrl], );
})();
