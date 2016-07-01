import {Component} from 'angular2/core';
import {Task} from './task';
import {TaskFormComponent} from './task-form.component';
import {TaskListComponent} from './task-list.component';
import {TaskService} from './task.service';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router'


@Component({
  selector: 'task-container',
  templateUrl: 'partials/task-container.html',
  directives: [TaskFormComponent, TaskListComponent, ROUTER_DIRECTIVES],
  styleUrls: ['css/app.css','css/task-container.component.css']
})


export class TaskContainerComponent {
  // declare status and tasks properties
  status: boolean = null;
  currentTask: boolean = null;
  tasks: Task[] = []

  // call a constructor
  constructor(private taskService: TaskService,
              private routeParams: RouteParams) {}

  // read the routeParams for status filtering
  // and call service for list on init
  ngOnInit() {
    this.status = this.routeParams.get('status');
    this.getTaskListFromService(this.status);
  }

  // call service for list with param status
  getTaskListFromService(status) {
    this.status = status;
    this.taskService.get(status)
      .subscribe(tasks => {
        this.tasks = tasks.reverse();
        this.currentTask = this.tasks[0]
      })
  }

  // handle addtask events, pass to service
  onAddTaskEvent(task) {
    this.taskService.addTaskToService(task)
      .subscribe( () => {
        this.status = null;
        this.getTaskListFromService(this.status);
      } );    
  }

  // handle startask events, pass to service
  onStarTaskEvent(task) {
    this.taskService.starTaskInService(task)
      .subscribe( () => {
        this.getTaskListFromService(this.status);
      } );    
  }

  // handle deletetask events, pass to service
  onDeleteTaskEvent(task) {
    this.taskService.deleteTaskFromService(task)
      .subscribe( () => {
        this.status = null;
        this.getTaskListFromService(this.status);
      } );
  }

  // handle deletetask events, pass to service
  onSaveTaskEvent(task) {
    this.taskService.saveTaskInService(task)
      .subscribe( () => {
        this.status = null;
        this.getTaskListFromService(this.status);
      } );
  }

}
