import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { IBookItemModel } from '../../models/books.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  @Input() book: IBookItemModel;
  @Output() imageIsLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  placeholderImage = 'assets/no_image.jpg';
  loadingImage = true;

  constructor(public elementRef: ElementRef) {}

  imageLoaded(): void {
    this.loadingImage = false;
    this.imageIsLoaded.emit();
  }
}
