import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  id: string;
  track: any;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService,
    private location: Location) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.spotify
      .getTrack(this.id)
      .subscribe((res: any) => this.renderTrack(res));
  }

  back(): void {
    this.location.back();
  }

  renderTrack(res: any): void {
    this.track = res;
  }
}
