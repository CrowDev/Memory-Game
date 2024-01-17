import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Entry } from '../../@types';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  entries: Entry[] = [];

  constructor(private facadeService: FacadeService) {}
}
