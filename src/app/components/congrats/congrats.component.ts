import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../services/facade.service';

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

  constructor(private facadeService: FacadeService) {}

  handleNewGame() {
    this.onNewGame.emit();
  }

  get user() {
    return this.facadeService.getUser();
  }
}
