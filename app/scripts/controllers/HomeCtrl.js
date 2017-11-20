(function() {
    function HomeCtrl($state, Task) {

        this.tasksIncomplete = Task.tasksIncomplete;

        this.addTask = function() {

          if (this.priority==undefined)
          {
            this.priority="2";
          }

          var priorityThread = getPriority(this.priority);

          this.newTask.status = 'incomplete';
          this.newTask.date = Math.round(Date.now() / 1000);
          this.newTask.pThread = priorityThread;
          this.tasksIncomplete.$add(this.newTask);
          this.newTask = {}

        }


      function getPriority(p) {

          var priorityArray = ["High", "Medium", "Low"];
          var newPriorities = [];
          var index=parseInt(p)-1;

          newPriorities.push(priorityArray[index]);
          priorityArray.splice(index, 1);

          newPriorities.push(priorityArray[0]);
          newPriorities.push(priorityArray[1]);

          var priorityThread=newPriorities[0]+","+pVal(newPriorities[0])+","+newPriorities[1]+","+pVal(newPriorities[1])+","+newPriorities[2]+","+pVal(newPriorities[2]);
          return priorityThread;
          }

        function pVal(priority) {
          var val;
          switch (priority) {
            case 'High':
              val = 1;
              break;
            case 'Medium':
              val = 2;
              break;
            default:
              val = 3;
          }
          return val;
        }

        this.completeTask = function(taskid) {
            firebase.database().ref('tasks/' + taskid.$id).set({
                title: taskid.title,
                status: 'complete'
            });
          }

            this.updateTask = function(taskid, newTitle, newPriority) {

              if (newPriority!=undefined) {
                priorityThread = getPriority(newPriority);
              }
              else {
                priorityThread = taskid.pThread;
              }

              firebase.database().ref('tasks/' + taskid.$id).set({
                  date: taskid.date,
                  title: newTitle,
                  status: taskid.status,
                  pThread: priorityThread
              });

        }

    }

    angular
        .module('giterdone')
        .controller('HomeCtrl', ['$state', 'Task', HomeCtrl]);
})();
