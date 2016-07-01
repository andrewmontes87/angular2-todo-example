import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Task} from './task';
import {TaskItemComponent} from './task-item.component';
import {TaskDetailsComponent} from './task-details.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
  selector: 'task-list',
  templateUrl: 'partials/task-list.html',
  inputs: ['tasks'],
  directives: [TaskItemComponent, TaskDetailsComponent, ROUTER_DIRECTIVES],
  styleUrls: ['css/task-list.component.css']
})

export class TaskListComponent{

  // take in the currenttask and list of tasks from the container
  @Input('tasks') tasks;
  @Input('currentTask') currentTask;


  // output events back to the container
  @Output('starTaskList') star = new EventEmitter();
  @Output('deleteTaskList') delete = new EventEmitter();

  // handle events from child items
  onStarTaskEvent(e) { this.star.emit(e); }
  onDeleteTaskEvent(e) { 
    this.currentTask = null;
    this.delete.emit(e); 
  }

  onShowTaskDetailsEvent(e) {
    this.currentTask = e;
    console.log(this.currentTask)
  }

  onHideTaskDetailsEvent(e) {
    this.currentTask = null;
  }

}
