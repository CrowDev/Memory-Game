import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../@types';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly API_URL = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries';

  constructor(private httpClient: HttpClient) { }

  getImages(entries: number) {
    const params = new HttpParams().set('per_page', entries.toString());
    return this.httpClient.get<Result>(this.API_URL, {params});
  }
}
