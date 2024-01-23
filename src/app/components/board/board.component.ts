import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Entry } from '../../@types';
import { FacadeService } from '../../services/facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  entries: Entry[] = [];
  subscription!: Subscription;

  constructor(private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.initListener();
  }

  initListener() {
    this.subscription = this.facadeService.getEntries().subscribe((entries: Entry[]) => {
      this.entries = entries;
    });
  }

  get currentDifficulty() {
    return this.facadeService.currentDifficulty;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
