(function() {
    function HomeCtrl($scope, $state, $interval, Task) {

        this.tasksIncomplete = Task.tasksIncomplete;
        this.currentTime = Task.currentTime;

        this.addTask = function() {
            this.newTask.status = 'incomplete';
            this.newTask.date = Math.round(Date.now() / 1000);
            this.tasksIncomplete.$add(this.newTask);
            this.newTask = {}
        }

        this.completeTask = function(taskid) {
            firebase.database().ref('tasks/' + taskid.$id).set({
                date: taskid.date,
                title: taskid.title,
                status: 'complete'
            });

        }
    }

    angular
        .module('giterdone')
        .controller('HomeCtrl', ['$state', '$scope', '$interval', 'Task', HomeCtrl]);
})();
