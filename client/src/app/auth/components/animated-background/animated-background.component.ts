import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShapesModel } from '../../models/shape.model';

@Component({
  selector: 'app-animated-background',
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedBackgroundComponent implements OnInit {

  shapes: ShapesModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createShapes();
  }

  // Create 15 shapes with random style parameters.
  createShapes(): void {
    for (let i = 0; i < 8; i++) {
      const shapeDimension = `${this.randomNumber(i * 10, 150)}px`;
      const shapeObj: ShapesModel = {
        left: `${this.randomNumber(i, 85)}%`,
        width: shapeDimension,
        height: shapeDimension,
        animationDelay: `${this.randomNumber(0, 8)}s`,
        animationDuration: `${this.randomNumber(10, 50)}s`,
      };
      this.shapes.push(shapeObj);
    }
  }

  // Generate a random integer.
  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }


}
