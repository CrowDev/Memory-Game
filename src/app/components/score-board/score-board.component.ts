import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../../services/facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent implements OnInit {
  wrongs = 0;
  hits = 0;
  subscription!: Subscription;
  constructor(private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.initListener();
  }

  initListener() {
    this.subscription = this.facadeService.isMissed().subscribe((missed: number) => {
      this.wrongs = missed;
    });
    this.subscription.add(
      this.facadeService.isHit().subscribe((hits: number) => {
        this.hits = hits;
      }),
    );
  }
}
