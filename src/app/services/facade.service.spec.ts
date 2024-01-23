import { FacadeService } from './facade.service';
import { ImagesService } from './images.service';
import * as expectedImages from '../util/mock-data.json';
import { Entry, Result } from '../@types';


// TODO: test observables, subjects and reset game
describe('FacadeService', () => {
  let imageServiceSpy: jasmine.SpyObj<ImagesService>;
  let service: FacadeService;
  let entries: Entry[];

  beforeEach(() => {
    imageServiceSpy = jasmine.createSpyObj('ImageService', ['getImages']);
    service = new FacadeService(imageServiceSpy);
    const result: Result = expectedImages;
    entries = result.entries;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should duplicate entries', () => {
    const duplicatedEntries = service.duplicateEntries(entries);
    expect(duplicatedEntries.length).toEqual(40);
  });

  it('should shuffle entries', () => {
    const shuffledEntries = service.shuffleCards(entries);
    expect(shuffledEntries.length).toEqual(20);
    expect(shuffledEntries).not.toEqual(entries);
  });

  it('should set max corrects', () => {
    service.setMaxCorrects(10);
    service.corrects = Array(10).fill('');
    expect(service.isWin()).toBe(true);
  });

  it('should set current selected card', () => {
    const card = { uuid: '1', index: 0 };
    expect(service.currentSelectedCard)
      .withContext('current card is null')
      .toBe(null);
    service.validateCurrentSelectedCard(card);
    expect(service.currentSelectedCard)
      .withContext('current card is set')
      .toEqual(card);
  });

  it('should add 1 to count play', () => {
    const card = { uuid: '1', index: 0 };
    service.validatePlay(card);
    expect(service.countPlay).toEqual(1);
    expect(service.hit$.value).toEqual(0);
    expect(service.missed$.value).toEqual(0);
  });

  it('should add 1 to hit', () => {
    const card1 = { uuid: '1', index: 0 };
    const card2 = { uuid: '1', index: 1 };
    service.validateCurrentSelectedCard(card1);
    service.countPlay = 1;
    service.validatePlay(card2);
    expect(service.hit$.value).toEqual(1);
  });

  it('should add 1 to wrong', () => {
    const card1 = { uuid: '1', index: 0 };
    const card2 = { uuid: '11', index: 1 };
    service.validateCurrentSelectedCard(card1);
    service.countPlay = 1;
    service.validatePlay(card2);
    expect(service.missed$.value).toEqual(1);
  });

  it('should doing nothing if click same card', () => {
    const card = { uuid: '1', index: 0 };
    service.validateCurrentSelectedCard(card);
    service.countPlay = 1;
    service.validatePlay(card);
    expect(service.hit$.value).toEqual(0);
    expect(service.missed$.value).toEqual(0);
    expect(service.countPlay).toEqual(1);
  });

  it('should reset states after 2 cards clicked', () => {
    const card1 = { uuid: '1', index: 0 };
    const card2 = { uuid: '11', index: 1 };
    expect(service.currentSelectedCard)
      .withContext('there is no current play yet')
      .toBe(null);
    expect(service.countPlay)
      .withContext('there is no current play yet')
      .toBe(0);
    service.validateCurrentSelectedCard(card1);
    service.validatePlay(card1);
    expect(service.currentSelectedCard)
      .withContext('there is current play')
      .toEqual(card1);
    expect(service.countPlay)
      .withContext('there is current play')
      .toBe(1);
    service.validatePlay(card2);
    expect(service.currentSelectedCard)
      .withContext('after 2 cards clicked, current play is reset')
      .toBe(null);
    expect(service.countPlay)
      .withContext('after 2 cards clicked, current play is reset') 
      .toBe(0);
  });

  it('should verify whetever user is stored or not', () => {
    localStorage.removeItem('user');
    expect(service.isUserStored())
      .withContext('no user is stored')
      .toBe(false);
    service.storeUser('User');
    expect(service.isUserStored())
      .withContext('user is stored')
      .toBe(true);
  });

  it('should store user', () => {
    service.storeUser('User');
    expect(localStorage.getItem('user')).toEqual('User');
  });

  it('should retrieve user', () => {
    service.storeUser('User');
    expect(service.getUser()).toEqual('User');
  });

  it('should check if clicking the exact same card', () => {
    const card1 = { uuid: '1', index: 0 };
    const card2 = { uuid: '1', index: 1 };
    service.countPlay = 1;
    service.validateCurrentSelectedCard(card1);
    expect(service.isClickingExactSameCard(card1)).toBe(true);
    expect(service.isClickingExactSameCard(card2)).toBe(false);
  });

  it('should check if clicking the a cloned card', () => {
    const card1 = { uuid: '1', index: 0 };
    const card2 = { uuid: '1', index: 1 };
    service.validateCurrentSelectedCard(card1);
    expect(service.isClickingClonedCard(card2)).toBe(true);
    expect(service.isClickingClonedCard(card1)).toBe(false);
  });

  it('should check if user win', () => {
    service.setMaxCorrects(10);
    service.corrects = Array(10).fill('');
    expect(service.isWin()).toBe(true);
    service.corrects = Array(5).fill('');
    expect(service.isWin()).toBe(false);
  });
});
