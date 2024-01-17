import { NgOptimizedImage } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Entry } from '../../@types';
import { FacadeService } from '../../services/facade.service';
import { animation } from '../../util/animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [animation.reveal]
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() entry!: Entry;
  revealed = false;
  subscriptions!: Subscription;

  constructor(private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.initListener();
  }

  initListener() {
    this.subscriptions= this.facadeService.isWrong().subscribe((isWrong: boolean) => {
      if (isWrong) {
        if (this.isCurrentCardCorrect()) return;
        this.revealed = false;
      }
    });
  }

  handleClick() {
    this.revealed = true;
    const uuid = this.entry.fields.image.uuid;
    this.facadeService.handlePlay(uuid);
  }

  isCurrentCardCorrect() {
    return this.facadeService.corrects.includes(this.entry.fields.image.uuid);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
