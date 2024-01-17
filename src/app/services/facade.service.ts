import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  countPlay = 0;
  currentSelectedCard: string | null = null;
  score = 0;
  error = 0;
  errorSubject$ = new Subject<boolean>();
  corrects: string[] = [];

  constructor() { }

  handlePlay(uuid: string) {
    if (!this.currentSelectedCard) {
      this.currentSelectedCard = uuid;
    }
    this.validatePlay(uuid);
  }

  validatePlay(uuid: string) {
    this.countPlay += 1;
    if (this.countPlay === 2) {
      if (this.currentSelectedCard === uuid) {
        this.score += 1;
        this.corrects.push(uuid);
      } else {
        this.errorSubject$.next(true);
        this.error += 1;
      }
      this.resetStates();
    }
  }

  resetStates() {
    this.currentSelectedCard = null;
    this.countPlay = 0;
  }

  isWrong() {
    return this.errorSubject$.asObservable();
  }
}
