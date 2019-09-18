import { Injector, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentCComponent } from './components/component-c/component-c.component';
import { ComponentBComponent } from './components/component-b/component-b.component';
import { filter, map, mergeMap } from 'rxjs/operators';

import { StoreService as StoreA } from '@lib-store-a';
import { StoreService as StoreB } from '@lib-store-b';
import { StoreService as StoreC } from '@lib-store-c';


// TODO: make data cacheable with flag
// data: {
//   type: 'homepage | landing',
//     preload: [{
//     store: StoreA,
//     useCaching: true,
//     cachTime?: 5000
//   }]
// }

const routes: Routes = [
  {path: '', redirectTo: 'a', pathMatch: 'full'},
  {
    path: 'a', pathMatch: 'full', component: ComponentAComponent,
    data: {
      type: 'homepage | landing',
      preload: [StoreA]
    }
  }, {
    path: 'b', pathMatch: 'full', component: ComponentBComponent,
    data: {
      type: 'overview',
      preload: [StoreA, StoreB]
    }
  }, {
    path: 'c', pathMatch: 'full', component: ComponentCComponent,
    data: {
      type: 'detail',
      preload: [StoreA, StoreC]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private route: ActivatedRoute, private injector: Injector) {
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map(r => r.firstChild ? r.firstChild : r),
      filter(r => r.outlet === 'primary'),
      mergeMap(r => r.data)).subscribe((data) => {
      if (!!data && data.preload) {
        data.preload.forEach(s => {
          const store = this.injector.get(s);
          store.getAll(true);
        });
      }
    });
  }
}
