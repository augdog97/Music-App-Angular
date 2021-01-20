import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import {environment} from '../environments/environment';


/**
 * a. This method performs a GET request to the spotify URL by passing our query as the search term and type harcoded to track.
 *    - The http call returns an Observable and we are using the RxJS function map to transform the result we would get (An http modules Response Object) and parsing it as JSON, resulting on an object. 
 */

@Injectable()
export class SpotifyService {
  static BASE_URL = "https://api.spotify.com/v1";

  constructor(private http: HttpClient) { }

  query(URL: string, params?: Array<string>): Observable<any> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join("&")}`;
    }
    const apiKey = environment.spotifyApiKey;
    const apiId = environment.spotifyApiId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiId}${apiKey}`
    });
    const options = {
      headers: headers
    };

    return this.http.request("GET", queryURL, options);
  }

  search(query: string, type: string): Observable<any> {
    return this.query(`/search`, [`q=${query}`, `type=${type}`]);
  }

  searchTrack(query: string): Observable<any> {
    return this.search(query, "track");
  }

  getTrack(id: string): Observable<any> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any> {
    return this.query(`/albums/${id}`);
  }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];