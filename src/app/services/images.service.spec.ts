import { TestBed } from '@angular/core/testing';
import * as expectedImages from '../util/mock-data.json';

import { ImagesService } from './images.service';
import { HttpClient } from '@angular/common/http';
import { Result } from '../@types';
import { of } from 'rxjs';

describe('ImagesService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ImagesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ImagesService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected images (HttpClient called once)', (done: DoneFn) => {
    const expectedResponse: Result = expectedImages;
    httpClientSpy.get.and.returnValue(of(expectedResponse));

    service.getImages(20).subscribe({
      next: (images: Result) => {
        expect(images).withContext('expected result').toEqual(expectedResponse);
        done();
      },
      error: (error: any) => done.fail(error),
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

});