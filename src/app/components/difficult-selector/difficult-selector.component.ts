import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-difficult-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './difficult-selector.component.html',
  styleUrl: './difficult-selector.component.css'
})
export class DifficultSelectorComponent {
  showDialog = false;
  closingAnimation = false;
  difficulties = [
    {label: 'easy (10 cards)', value: 5},
    {label: 'medium (20 cards)', value: 10},
    {label: 'hard (30 cards)', value: 15},
    {label: 'very hard (40 cards)', value: 20},
  ];
  selectedDifficult = 5;

  constructor(private facadeService: FacadeService) {}

  toggleDialog() {
    if (!this.showDialog) {
      this.closingAnimation = false;
      this.showDialog = true;
    } else {
      this.closingAnimation = true;
      setTimeout(() => {
        this.showDialog = false;
      }, 900);
    }
  }

  onDifficultChange(difficulty: number) {
    this.selectedDifficult = difficulty;
    this.toggleDialog();
    this.facadeService.initGame(difficulty);
  }
}
