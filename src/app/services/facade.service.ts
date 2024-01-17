import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ImagesService } from './images.service';
import { Entry, Result } from '../@types';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  countPlay = 0;
  currentSelectedCard: string | null = null;

  hit$ = new BehaviorSubject<number>(0);
  missed$= new BehaviorSubject<number>(0);
  errorSubject$ = new Subject<boolean>();
  winSubject$ = new Subject<boolean>();
  gameRestarted$ = new Subject<boolean>();
  corrects: string[] = [];
  entries: Entry[] = [];
  private maxCorrects = 0;

  constructor(private imagesService: ImagesService) { }

  initGame() {
    this.fetchImages();
  }

  fetchImages() {
    this.imagesService.getImages().subscribe((data: Result) => {
      this.handleFetchedImages(data.entries);
    }, (error) => console.log(error));
  }

  handleFetchedImages(entries: Entry[]) {
    this.setMaxCorrects(entries.length);
    const duplicatedEntries = this.duplicateEntries(entries);
    this.entries = this.shuffleCards(duplicatedEntries);
  }

  duplicateEntries(entries: Entry[]) {
    return entries.concat([...entries])
  }

  shuffleCards(entries: Entry[]) {
    return entries.sort(() => Math.random() - 0.5);
  }

  handlePlay(uuid: string) {
    if (!this.currentSelectedCard) {
      this.currentSelectedCard = uuid;
    }
    this.validatePlay(uuid);
    if (this.isWin()) {
      this.handleFinish();
    }
  }

  handleFinish() {
    this.winSubject$.next(true);
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

  resetScores() {
    this.hit$.next(0);
    this.missed$.next(0);
  }

  resetCorrects() {
    this.corrects = [];
  }

  restartGame() {
    this.resetStates();
    this.resetScores();
    this.winSubject$.next(false);
    this.gameRestarted$.next(true);
  }

  setMaxCorrects(maxCorrects: number) {
    this.maxCorrects = maxCorrects;
  }

  isWin() {
    return this.corrects.length === this.maxCorrects;
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

  isGameRestarted() {
    return this.gameRestarted$.asObservable();
  }
}
