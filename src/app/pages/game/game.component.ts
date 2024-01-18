import { Component, OnInit } from '@angular/core';
import { ScoreBoardComponent } from '../../components/score-board/score-board.component';
import { FacadeService } from '../../services/facade.service';
import { CongratsComponent } from '../../components/congrats/congrats.component';
import { BoardComponent } from '../../components/board/board.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    ScoreBoardComponent,
    CongratsComponent,
    BoardComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  gameFinished = false;

  constructor(private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.facadeService.initGame();
    this.initListener();
  }

  initListener() {
    this.facadeService.isGameFinished().subscribe((finished: boolean) => {
      this.gameFinished = finished;
    });
  }

  handleNewGame() {
    this.facadeService.restartGame();
  }
}
