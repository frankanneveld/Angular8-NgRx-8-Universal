import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
      * {font-family: Helvetica}
      a {text-decoration: none; color: black;}
      h1 {text-align: center}
      div:first-child { display: flex; justify-content: center; flex-flow: column nowrap; align-items: center}
      ul {list-style: none; display: inline-flex}
      li {margin:0 10px 0 0; padding: 10px}
      li:hover {background: cornflowerblue}
      span {width: 40%; text-align: center}
  `],
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
