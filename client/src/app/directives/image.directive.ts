import {
  Directive,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: 'img[loadingCheck]'
})
export class ImageDirective {
  @Output() loaded = new EventEmitter();

  constructor() {}

  @HostListener("load")
  @HostListener("error")
  imageLoaded() {
    this.loaded.emit();
    this.loaded.complete();
  }
}
