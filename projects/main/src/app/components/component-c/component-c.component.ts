import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService as ServiceC} from '@lib-store-c';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss']
})
export class ComponentCComponent implements OnInit, OnDestroy {

  private allSubscription$: Subscription;

  constructor(public serviceC: ServiceC) {
    this.serviceC.getAll();
  }

  ngOnInit() {
    this.allSubscription$ = this.serviceC.allSubscription.subscribe( response => {
        if (response) {
          console.log('Selector > ', response);
        }
      });
  }

  ngOnDestroy(): void {
    this.allSubscription$.unsubscribe();
  }

}
