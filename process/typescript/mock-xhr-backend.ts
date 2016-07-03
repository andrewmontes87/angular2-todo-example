import {Request, Response, ResponseOptions, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export class MockXHRBackend {
    constructor() {
    }

    createConnection(request: Request) {
        var response = new Observable((responseObserver: Observer<Response>) => {
            var responseData;
            var responseOptions;
            switch (request.method) {
                case RequestMethod.Get:
                    if (request.url.indexOf('tasks?status=') >= 0 || request.url === 'tasks') {
                        var status;
                        if (request.url.indexOf('?') >= 0) {
                            status = request.url.split('=')[1];
                            if (status === 'undefined') status = '';
                        }
                        var tasks;
                        if (status && status >= 0) {
                            tasks = this._tasks.filter(task => String(task.status) === String(status));
                            if (tasks.length === 0) {
                                // responseOptions = new ResponseOptions({
                                //     body: JSON.stringify({error: 'status is not valid'}),
                                //     status: 404}
                                // );
                                // responseObserver.error(new Response(responseOptions));
                                // tasks = this._tasks;
                            }
                        } else {
                            tasks = this._tasks;
                        }
                        responseOptions = new ResponseOptions({
                            body: { tasks: JSON.parse(JSON.stringify(tasks)) },
                            status: 200
                        });
                    } else {
                        var id = parseInt(request.url.split('/')[1]);
                        tasks = this._tasks.filter(task => task.id === id);
                        responseOptions = new ResponseOptions({
                            body: JSON.parse(JSON.stringify(tasks[0])),
                            status: 200
                        });
                    }
                    break;
                case RequestMethod.Post:
                    if (request.url === 'star') {
                        let body = JSON.parse(request.text().toString());
                        let id = body.id;
                        if (id >= 0) {
                            var task = this._tasks.find(task => task.id === id);
                            var index = this._tasks.indexOf(task);
                            if (index >= 0) {
                              this._tasks[index].starred = !this._tasks[index].starred;
                              responseOptions = new ResponseOptions({ status: 201 });  
                            } else {
                                responseOptions = new ResponseOptions({
                                    body: JSON.stringify({error: 'id for /star is not valid'}),
                                    status: 404}
                                );
                                responseObserver.error(new Response(responseOptions));
                            }
                        }                      
                        responseOptions = new ResponseOptions({ status: 201 });                        
                    } else if (request.url === 'save') {
                        let body = JSON.parse(request.text().toString());
                        let id = body.id;
                        if (id >= 0) {
                            var task = this._tasks.find(task => task.id === id);
                            var index = this._tasks.indexOf(task);
                            if (index >= 0) {
                                this._tasks[index] = body;
                                responseOptions = new ResponseOptions({ status: 201 }); 
                            } else {
                                responseOptions = new ResponseOptions({
                                    body: JSON.stringify({error: 'id for /save is not valid'}),
                                    status: 404}
                                );
                                responseObserver.error(new Response(responseOptions));
                            }
                        }
                    } else {
                        let task = JSON.parse(request.text().toString());
                        task.id = this._getNewId();
                        this._tasks.push(task);
                        responseOptions = new ResponseOptions({ status: 201 });                        
                    }
                    break;
                case RequestMethod.Delete:
                    var id = parseInt(request.url.split('/')[1]);
                    this._deleteTask(id);
                    responseOptions = new ResponseOptions({ status: 200 });
            }
            
            var responseObject = new Response(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => { };
        });
        return { response };
    }
    
    _deleteTask(id) {
        var task = this._tasks.find(task => task.id === id);
        var index = this._tasks.indexOf(task);
        if (index >= 0) {
            this._tasks.splice(index, 1);
        }
    }
    
    _getNewId() {
        if (this._tasks.length > 0) {
            return Math.max.apply(Math, this._tasks.map(task => task.id)) + 1;
        } else {
            return 0;
        }
    }

    _tasks = [
      {
        "id": 0,
        "order": 0,
        "name":"Eat breakfast",
        "description":"Eat a healthy breakfast to start the day.",
        "status":2,
        "starred":false
      },
      {
        "id": 1,
        "order": 1,
        "name":"Build Angular2 TODO app",
        "description":"Build a simple TODO app with Angular2.",
        "status":1,
        "starred":false
      },
      {
        "id": 2,
        "order": 2,
        "name":"Party",
        "description":"Have a party. Invite cool people.",
        "status":0,
        "starred":true
      },
    ];
}