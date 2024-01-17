import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  countPlay = 0;
  currentSelectedCard: string | null = null;
  score = 0;
  error = 0;

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
      } else {
        this.error += 1;
      }
      this.resetCounter();
    }
  }

  resetCounter() {
    this.countPlay = 0;
  }
}
