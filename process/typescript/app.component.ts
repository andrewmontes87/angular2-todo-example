import {Component} from 'angular2/core';
import {TaskContainerComponent} from './task-container.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

@RouteConfig([
  { path: '/:status', component: TaskContainerComponent, name: 'List' },
  { path: '/task/:taskid', component: TaskContainerComponent, name: 'EditTask' },
])
@Component({
  selector: 'my-app',
  templateUrl: 'partials/app.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['css/app.css']
})


export class AppComponent {}

