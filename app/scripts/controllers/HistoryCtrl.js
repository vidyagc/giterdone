(function() {
    function HistoryCtrl($state, Task) {

        this.tasksComplete = Task.tasksComplete;
        this.tasksExpired = Task.tasksExpired;
        this.tasksIncomplete = Task.tasksIncomplete;

        this.currentTime = Task.currentTime;

        this.deleteTasks = function() {
            // code to delete completed and expired tasks
        }

    }

    angular
        .module('giterdone')
        .controller('HistoryCtrl', ['$state', 'Task', HistoryCtrl], );
})();
