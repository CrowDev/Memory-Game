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
    this.uuid = this.entry.fields.image.uuid;
  }

  handleClick() {
    if (this.isBlocked) return;
    this.revealed = true;
    this.facadeService.handlePlay(this.uuid);
  }

  isCurrentCardCorrect() {
    return this.facadeService.corrects.includes(this.uuid);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
