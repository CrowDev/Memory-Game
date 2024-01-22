import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ImagesService } from './images.service';
import { Card, Entry, Result } from '../@types';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  countPlay = 0;
  currentSelectedCard: Card | null = null;

  hit$ = new BehaviorSubject<number>(0);
  missed$ = new BehaviorSubject<number>(0);
  entries$ = new BehaviorSubject<Entry[]>([]);
  errorSubject$ = new Subject<boolean>();
  winSubject$ = new Subject<boolean>();
  blockActions$ = new Subject<boolean>();
  gameRestarted$ = new Subject<boolean>();
  corrects: string[] = [];
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
    const shuffledEntries = this.shuffleCards(duplicatedEntries);
    this.entries$.next(shuffledEntries);
  }

  duplicateEntries(entries: Entry[]) {
    return entries.concat([...entries])
  }

  shuffleCards(entries: Entry[]) {
    // TODO: use toSorted instead of sort
    const copy = [...entries];
    return copy.sort(() => Math.random() - 0.5);
  }

  handlePlay(card: Card) {
    if (!this.currentSelectedCard) {
      this.currentSelectedCard = card;
    }
    this.validatePlay(card);
    if (this.isWin()) {
      this.handleFinish();
    }
  }

  handleFinish() {
    this.winSubject$.next(true);
  }


  validatePlay(card: Card) {
    if (this.isClickingExactSameCard(card)) {
      return;
    }
    this.countPlay += 1;
    if (this.countPlay !== 2) {
      return;
    }
    if (this.isClickingClonedCard(card)) {
      this.handleHitCard(card);
    } else {
      this.handleMissedCard();
    }
    this.resetStates();
  }

  handleHitCard(card: Card) {
    const { value } = this.hit$;
    this.hit$.next(value + 1);
    this.corrects.push(card.uuid);
  }

  handleMissedCard() {
    const { value } = this.missed$;
    this.missed$.next(value + 1);
    this.blockActions$.next(true);
    setTimeout(() => {
      this.errorSubject$.next(true);
      this.blockActions$.next(false);
    }, 1000)
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
    this.resetCorrects();
    this.winSubject$.next(false);
    this.gameRestarted$.next(true);
    const shuffledEntries = this.shuffleCards(this.entries$.value);
    this.entries$.next(shuffledEntries);
  }

  storeUser(user: string) {
    localStorage.setItem('user', user);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  isUserStored() {
    return !!this.getUser();
  }

  setMaxCorrects(maxCorrects: number) {
    this.maxCorrects = maxCorrects;
  }

  getEntries() {
    return this.entries$.asObservable();
  }

  isClickingClonedCard(card: Card) {
    return this.currentSelectedCard?.index !== card.index && this.currentSelectedCard?.uuid === card.uuid;
  }

  isClickingExactSameCard(card: Card) {
    return this.countPlay === 1 && this.currentSelectedCard?.index === card.index
  }

  isWin() {
    return this.corrects.length === this.maxCorrects;
  }

  areActionsBlocked() {
    return this.blockActions$.asObservable();
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

  isGameFinished() {
    return this.winSubject$.asObservable();
  }
}
