import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {StatusPipe} from './status.pipe';

@Component({
  selector: 'task-details',
  templateUrl: 'partials/task-details.html',
  inputs: ['task','edit'],
  pipes: [StatusPipe],
  styleUrls: ['css/app.css','css/task-details.component.css']
})

export class TaskDetailsComponent{

  @Input('myTask') task;
  @Input('myEdit') editFlag;

  @Output('editTaskItem') edit = new EventEmitter();

  onEditTask() { 
    this.edit.emit(this.task); 
  }

}
