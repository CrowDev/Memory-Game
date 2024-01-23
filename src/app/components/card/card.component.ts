import { NgOptimizedImage } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Card, Entry } from '../../@types';
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
  @Input() index!: number;
  uuid: string = '';
  revealed = false;
  isBlocked = false;
  subscriptions!: Subscription;

  constructor(private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.initListener();
    this.setUuid();
  }

  initListener() {
    this.subscriptions= this.facadeService.isWrong().subscribe((isWrong: boolean) => {
      if (this.isCurrentCardCorrect()) return;
      if (isWrong) {
        this.revealed = false;
      }
    });
    this.subscriptions.add(
      this.facadeService.isGameRestarted().subscribe((isRestarted: boolean) => {
        if (isRestarted) {
          this.revealed = false;
        }
      }),
    );
    this.subscriptions.add(
      this.facadeService.areActionsBlocked().subscribe((isBlocked: boolean) => {
        this.isBlocked = isBlocked;
      })
    );
  }

  setUuid() {
    if (!this.entry?.fields?.image) return;
    this.uuid = this.entry.fields.image.uuid;
  }

  handleClick() {
    if (this.isBlocked || this.isCurrentCardCorrect()) return;
    this.revealed = true;
    const card: Card = {
      uuid: this.uuid,
      index: this.index
    };
    this.facadeService.handlePlay(card);
  }

  isCurrentCardCorrect() {
    return this.facadeService.corrects.includes(this.uuid);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
