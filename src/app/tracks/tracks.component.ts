import { Component, OnInit } from '@angular/core';

import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  id: string;
  track: Object;
  spotify: any;
  constructor() { }

  ngOnInit(): void {
    this.spotify
    .getTrack(this.id)
    .subscribe((res:any) => this.renderTrack(res));
  }

}
