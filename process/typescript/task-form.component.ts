import {Component, Output, Input, Inject, EventEmitter} from 'angular2/core';
import {Control, Validators, FormBuilder} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PROVIDED_VALUE} from './providers';


@Component({
  selector: 'task-form',
  templateUrl: 'partials/task-form.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['css/task-form.component.css']
})

export class TaskFormComponent{
  // declare a task form property
  taskForm;

  // call a constructor
  constructor(private formBuilder: FormBuilder,
              @Inject(PROVIDED_VALUE) public providedValue) {}

  // build the form on init
  ngOnInit() {
    if (!this.taskForm) {
      this._buildForm();
    }    

  }

  // easter egg validator for form
  nameValidator(control) {
    if (control.value.trim().length === 0) return null;
    var name = String(control.value);
    var forbidden = "do bad things"
    if (name != forbidden) return null;
    return {'forbidden': name};
  }

  // output events back to the container
  @Output('addTask') addTask = new EventEmitter();

  @Input() isResetting = false;


  // handle form submission
  onSubmit(form_value) { 
    this.addTask.emit(form_value); 
    this._buildForm();
    this.isResetting = true;
    setTimeout(() => this.isResetting = false, 0);
  }



  _buildForm() {
     this.taskForm = this.formBuilder.group({
      'name' : new Control('', Validators.compose([
                Validators.required, 
                this.nameValidator
                ])),
      'status' : new Control(0)
    });   

  }

}




