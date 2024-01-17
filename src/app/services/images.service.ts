import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../@types';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly API_URL = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

  constructor(private httpClient: HttpClient) { }

  getImages() {
    return this.httpClient.get<Result>(this.API_URL);
  }
}
