import {Pipe} from 'angular2/core';

@Pipe({
  name: 'status'
})

export class StatusPipe {
  transform(pipeData, [pipeModifier]) {
    return ['TODO','In Progress','Done'][pipeData];
  }
}
