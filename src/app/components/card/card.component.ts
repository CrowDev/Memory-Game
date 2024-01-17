import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Entry } from '../../@types';
import { FacadeService } from '../../services/facade.service';
import { animation } from '../../util/animation';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [animation.reveal]
})
export class CardComponent {
  @Input() entry!: Entry;
  revealed = false;

  constructor(private facadeService: FacadeService) {}

  handleClick() {
    this.revealed = true;
    const uuid = this.entry.fields.image.uuid;
    this.facadeService.handlePlay(uuid);
  }
}
