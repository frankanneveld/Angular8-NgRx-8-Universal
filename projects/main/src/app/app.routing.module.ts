import { NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentCComponent } from './components/component-c/component-c.component';
import { ComponentBComponent } from './components/component-b/component-b.component';
import { filter, map, mergeMap, tap } from 'rxjs/operators';


const routes: Routes = [
  {path: '', redirectTo: 'a', pathMatch: 'full'},
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
      preload: ['empty string', {key: 3}]
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
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map(r => r.firstChild ? r.firstChild : r),
      filter(r => r.outlet === 'primary'),
      mergeMap(r => r.data)).subscribe((result) => {
      console.log('Current route data : ', result);
    });
  }
}
