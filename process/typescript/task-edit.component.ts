import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Control, Validators, FormBuilder} from 'angular2/common';
import {Task} from './task';
import {StatusPipe} from './status.pipe';

@Component({
  selector: 'task-edit',
  templateUrl: 'partials/task-edit.html',
  pipes: [StatusPipe],
  styleUrls: ['css/app.css','css/task-edit.component.css']
})

export class TaskEditComponent{

  editForm;


  constructor(private formBuilder: FormBuilder) {}

  // build the form on init

  @Input() isResetting = false;
  @Input('myTask') task;
  changed: Task;

  ngOnInit() {
    this.changed = Object.assign({}, this.task)
    if (!this.editForm) {
      this._buildForm(this.changed);
    }    
  }

  @Output('deleteTaskItem') delete = new EventEmitter();
  @Output('editTaskItem') edit = new EventEmitter();
  @Output('saveTaskItem') save = new EventEmitter();

  onDeleteTask() { this.delete.emit(this.task); }
  onEditTask() { this.edit.emit(this.task); }

  // handle form submission
  onSubmit(form_value) { 
    this.save.emit(form_value); 
  }

  _buildForm(task) {
     this.editForm = this.formBuilder.group({
      'name' : new Control(task.name),
      'status' : new Control(task.status),
      'description' : new Control(task.description),
      'id' : new Control(task.id),
      'order' : new Control(task.order),
      'starred' : new Control(task.starred)
    });   

  }

}