import {Directive, HostBinding, Input} from 'angular2/core'

@Directive({
  selector: '[todoStarredClass]'
})

export class StarredClassDirective {
  @HostBinding('class.starred') isStarred;
  @Input()
  set todoStarredClass(value) {
    this.isStarred = value;
  }
}