import {Directive, HostBinding, Input} from 'angular2/core'

@Directive({
  selector: '[todoStatusClass]'
})

export class StatusClassDirective {
  @HostBinding('class') status;
  @Input()
  set todoStatusClass(value) {
    this.status = 'status-'+String(value);
  }
}