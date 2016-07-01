import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {TaskService} from './task.service';
import {provide} from 'angular2/core';
import {PROVIDED_VALUE, providedValue} from './providers';
import {HTTP_PROVIDERS, XHRBackend} from 'angular2/http';
import {MockXHRBackend} from './mock-xhr-backend';
import {ROUTER_PROVIDERS} from 'angular2/router';



bootstrap(AppComponent, [
  TaskService,
  provide(PROVIDED_VALUE, { useValue : providedValue }),
  HTTP_PROVIDERS,
  provide(XHRBackend, { useClass : MockXHRBackend }),
  ROUTER_PROVIDERS
])
.catch(err => console.error(err));
