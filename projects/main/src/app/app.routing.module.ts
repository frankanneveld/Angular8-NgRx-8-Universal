import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentAComponent} from './components/component-a/component-a.component';
import {ComponentCComponent} from './components/component-c/component-c.component';
import {ComponentBComponent} from './components/component-b/component-b.component';


const routes: Routes = [
  { path: '', redirectTo: 'a', pathMatch: 'full'},
  {
    path: 'a', pathMatch: 'full', component: ComponentAComponent,
    data: {
      type: 'a',
      preload: []
    }
  }, {
    path: 'b', pathMatch: 'full', component: ComponentBComponent,
    data: {
      type: 'b',
      preload: []
    }
  }, {
    path: 'c', pathMatch: 'full', component: ComponentCComponent,
    data: {
      type: 'c',
      preload: []
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
