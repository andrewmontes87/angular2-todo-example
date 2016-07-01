import {Task} from './task';
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  tasks;

  constructor(private http: Http) {}

  get(status) {
    var searchParams = new URLSearchParams()
    searchParams.append('status',status);
    // return this.tasks;
    return this.http.get('tasks', { search: searchParams })
      .map(response => {
        return response.json().tasks;
      });
  }

  addTaskToService(new_task) {
    var task = {
      'name':new_task.name, 
      'description':'Add a description.', 
      'status': new_task.status,
      'starred': false
    }
    return this.http.post('tasks', JSON.stringify(task), { headers: new Headers({'Content-Type':'application/json'}) })
      .map(response => {});
  }

  starTaskInService(task) {
    var headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('star', JSON.stringify({'id':task.id}), { headers: headers })
      .map(response => {});
  }

  deleteTaskFromService(task) {
    return this.http.delete(`tasks/${task.id}`)
      .map(response => {});
  }
}
