import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appActiveItem]',
})
export class ActiveItemDirective {
  @Input() private appActiveItem: boolean = false;

  @HostBinding('class.active')
  private get isActive(): boolean {
    return this.appActiveItem;
  }
}
