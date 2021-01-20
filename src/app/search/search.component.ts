import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

// Services
import {SpotifyService} from  '../spotify.service';

/**  NOTE: In tsconfig set "strict" to false to get rid of type errors.
 * a. In the constructor we are injecting the SpotifyService, Router, and ActivatedRoute and making them properties of our class.
 *  a1. In the constructor we subscribe to the queryParams property - this lets us access query parameters, such as the search term (params['query']).
 * b. Performing a search on page load. If the URL includes a search query it will jump right into the results. 
 * c. The search function uses the current value of this.query to know what to search for.
 *    - Because we subscribed to the queryParam in the constructor, we can be sure that this.query qill always have the most up to date value.
 *  c1. We then subscribe to the searchTrack Observable and whenever new results are emitted we call renderResults.
 * d. Declared results as a component property. Whenever its value is changed, the view will be automatically updated by Angular.
 * e. In the submit method we are manually telling the router to navigate to the search route, and providing a query parameter.
 *  e1. then performing the actualy search.
 *    - The benefit of doing it this way is that if we reload the browser we are going to see the same search result rendered. We are "persisting" the search term on the URL.
 */

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: any;

  constructor(private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; });
  }

  ngOnInit(): void {
    this.search();
  }

  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search());
  }

  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }

    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
