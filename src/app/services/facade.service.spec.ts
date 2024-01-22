import { TestBed } from '@angular/core/testing';

import { FacadeService } from './facade.service';
import { ImagesService } from './images.service';
import * as expectedImages from '../util/mock-data.json';
import { Entry, Result } from '../@types';

describe('FacadeService', () => {
  let imageServiceSpy: jasmine.SpyObj<ImagesService>;
  let service: FacadeService;
  let entries: Entry[];

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(FacadeService);
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
});
