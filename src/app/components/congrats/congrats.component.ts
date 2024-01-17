import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-congrats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './congrats.component.html',
  styleUrl: './congrats.component.css'
})
export class CongratsComponent {

  @Input()
  showCongrats = false;

  @Output()
  onNewGame = new EventEmitter();

  handleNewGame() {
    this.onNewGame.emit();
  }

}
