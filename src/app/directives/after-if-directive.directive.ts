import {
  Directive,
  EventEmitter,
  AfterContentInit,
  Output,
} from '@angular/core';

@Directive({ selector: '[appAfterIf]' })
export class AfterIfDirective implements AfterContentInit {
  @Output('appAfterIf')
  public after: EventEmitter<void> = new EventEmitter<void>();

  public ngAfterContentInit(): void {
    // timeout helps prevent unexpected change errors
    setTimeout(() => this.after.next());
  }
}
