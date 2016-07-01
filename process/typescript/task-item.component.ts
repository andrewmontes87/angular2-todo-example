import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {StatusPipe} from './status.pipe';
import {StarredClassDirective} from './starred-class.directive';
import {StatusClassDirective} from './status-class.directive';

@Component ({
  selector: 'task-item',
  directives: [StarredClassDirective, StatusClassDirective],
  pipes: [StatusPipe],
  templateUrl: 'partials/task-item.html',
  styleUrls : ['css/task-item.component.css'],
  inputs: ['task']
})

export class TaskItemComponent {
  // take in the task from the list
  @Input('myTask') task;

  // output events back to the list
  @Output('starTaskItem') star = new EventEmitter();
  @Output('showTaskDetailsItem') detail = new EventEmitter();

  // emit item events to the list
  onStarTask() { this.star.emit(this.task); }
  onShowTaskDetails() { this.detail.emit(this.task); }
}
