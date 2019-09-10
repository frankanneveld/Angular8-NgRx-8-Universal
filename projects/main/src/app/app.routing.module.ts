import {NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router, RouterModule, Routes} from '@angular/router';
import {ComponentAComponent} from './components/component-a/component-a.component';
import {ComponentCComponent} from './components/component-c/component-c.component';
import {ComponentBComponent} from './components/component-b/component-b.component';
import {filter} from 'rxjs/operators';


const routes: Routes = [
  { path: '', redirectTo: 'a', pathMatch: 'full'},
  {
    path: 'a', pathMatch: 'full', component: ComponentAComponent,
    data: {
      type: 'a',
      preload: ['b']
    }
  }, {
    path: 'b', pathMatch: 'full', component: ComponentBComponent,
    data: {
      type: 'b',
      preload: ['hello', 'goodbye']
    }
  }, {
    path: 'c', pathMatch: 'full', component: ComponentCComponent,
    data: {
      type: 'c',
      preload: ['empty string', { key: 3}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe((result) => {
      console.log('Current route: ', result);
    });

    // route.data.subscribe( res => console.log(res));
    console.log('Route data >', this.route.snapshot.data);
  }
}
