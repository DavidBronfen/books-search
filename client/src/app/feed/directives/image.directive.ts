import {
  Directive,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: 'img[appLoadingCheck]'
})
export class ImageDirective {
  @Output() loaded = new EventEmitter();

  constructor() {}

  @HostListener('load')
  @HostListener('error')
  imageLoaded(): void {
    this.loaded.emit();
    this.loaded.complete();
  }
}
