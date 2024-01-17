import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { CommonModule } from '@angular/common';
import { Entry, Result } from '../../@types';
import { CardComponent } from '../../components/card/card.component';
import { ScoreBoardComponent } from '../../components/score-board/score-board.component';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent, ScoreBoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private imagesService: ImagesService, private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.fetchImages();
    this.facadeService.winSubject$.subscribe((win: boolean) => {
      //TODO: handle win
    });
  }

  fetchImages() {
    this.imagesService.getImages().subscribe((data: Result) => {
      this.handleFetchedImages(data.entries);
    }, (error) => console.log(error));
  }

  handleFetchedImages(entries: Entry[]) {
    this.facadeService.setMaxCorrects(entries.length);
    const duplicateEntries = () => entries.concat([...entries])
    this.entries = duplicateEntries().sort(() => Math.random() - 0.5);
  }
}
