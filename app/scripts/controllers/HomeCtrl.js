(function() {
    function HomeCtrl($state, Task) {

        this.tasksIncomplete = Task.tasksIncomplete;

        this.addTask = function() {
          if (this.newTask.priority==undefined)
          {
              this.newTask.priority="2";
          }
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
        .controller('HomeCtrl', ['$state', 'Task', HomeCtrl]);
})();
