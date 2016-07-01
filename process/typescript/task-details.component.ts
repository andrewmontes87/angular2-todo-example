import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {StatusPipe} from './status.pipe';

@Component({
  selector: 'task-details',
  templateUrl: 'partials/task-details.html',
  inputs: ['task'],
  pipes: [StatusPipe],
  styleUrls: ['css/task-details.component.css']
})

export class TaskDetailsComponent{

  @Input('myTask') task;

  @Output('deleteTaskItem') delete = new EventEmitter();

  onDeleteTask() { this.delete.emit(this.task); }

}
