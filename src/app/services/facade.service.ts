import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  countPlay = 0;
  currentSelectedCard: string | null = null;

  hit$ = new BehaviorSubject<number>(0);
  missed$= new BehaviorSubject<number>(0);
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
        const { value } = this.hit$;
        this.hit$.next(value + 1);
        this.corrects.push(uuid);
      } else {
        const { value } = this.missed$;
        this.missed$.next(value + 1);
        this.errorSubject$.next(true);
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

  isHit() {
    return this.hit$.asObservable();
  }

  isMissed () {
    return this.missed$.asObservable();
  }
}
