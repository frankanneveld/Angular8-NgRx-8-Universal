import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`ul {
      list-style: none
  }`],
  providers: [RouterOutlet]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private outlet: RouterOutlet) {

  }

  ngOnInit(): void {
    // console.log(this.router.routerState.snapshot.toString());
    // this.route.data.subscribe(data => console.log('Route data : ', data));
    // console.log('Route', this.route);
    // console.log('Router', this.router);

    // this.route.data.subscribe( res => console.log('DATA', res));
    // console.log('Outlet', this.outlet.activatedRouteData);

  }


}
