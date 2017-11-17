(function() {
    function HomeCtrl($state, Task) {

        this.tasksIncomplete = Task.tasksIncomplete;

        this.addTask = function() {

          if (this.newTask.priority==undefined)
          {
            this.newTask.priority="2";
          }

          var priorityThread = getPriority(this.newTask.priority);

            this.newTask.status = 'incomplete';
            this.newTask.date = Math.round(Date.now() / 1000);
            this.newTask.pThread = priorityThread;
            this.tasksIncomplete.$add(this.newTask);
            this.newTask = {}
        }


      function getPriority(p) {

          var priorityArray = ["High", "Medium", "Low"];
          //pArrayVals = [["High", 1], ["Medium", 2], ["Low",3]]
          var newPriorities = [];
          var index=parseInt(p)-1;

          newPriorities.push(priorityArray[index]);
          priorityArray.splice(index, 1);

          newPriorities.push(priorityArray[0]);
          newPriorities.push(priorityArray[1]);

          var priorityThread=newPriorities[0]+","+pVal(newPriorities[0])+","+newPriorities[1]//+","+pVal(newPriorities[1])+","+newPriorities[2]+","+pVal(newPriorities[2]);
          // for (i=0;i++;i<=2) {
          //   priorityThread+=newPriorities[i]+","+pVal(newPriorities[i])+",";
          //   console.log(priorityThread);
          //   priorityThread='test';
          // }
          console.log(priorityThread);
          return priorityThread//newPriorities;
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
                date: taskid.date,
                title: taskid.title,
                status: 'complete'
            });
          }

            this.updateTask = function(taskid, newTitle, newPriority) {

              var newP;
              if (newPriority!=undefined) {
                newP = newPriority;
                  //console.log(newPriority);
              }
              else {
                newP = taskid.priority;
              }

              firebase.database().ref('tasks/' + taskid.$id).set({
                  date: taskid.date,
                  title: newTitle,
                  priority: newP,
                  status: taskid.status
              });

        }

    }

    angular
        .module('giterdone')
        .controller('HomeCtrl', ['$state', 'Task', HomeCtrl]);
})();
