import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
    {label: 'easy (10 cards)', value: 'easy'},
    {label: 'medium (20 cards)', value: 'medium'},
    {label: 'hard (30 cards)', value: 'hard'},
    {label: 'very hard (40 cards)', value: 'very-hard'},
  ];
  selectedDifficult = 'easy';

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

  onDifficultChange(difficulty: string) {
    this.selectedDifficult = difficulty;
    this.toggleDialog();
  }
}
