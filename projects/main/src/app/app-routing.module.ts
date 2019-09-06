import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
    data: {
      type: 'home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
