import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { CommonModule } from '@angular/common';
import { Entry, Result } from '../../@types';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages() {
    this.imagesService.getImages().subscribe((data: Result) => {
      this.handleFetchedImages(data.entries);
    }, (error) => console.log(error));
  }

  handleFetchedImages(entries: Entry[]) {
    const duplicateEntries = () => entries.concat([...entries])
    this.entries = duplicateEntries().sort(() => Math.random() - 0.5);
  }
}
