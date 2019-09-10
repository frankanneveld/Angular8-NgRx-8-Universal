import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService as ServiceC} from '@lib-store-c';
import {Subscription} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss']
})
export class ComponentCComponent implements OnInit, OnDestroy {

  private allSubscribtion$: Subscription;

  constructor(public serviceC: ServiceC) {
    this.serviceC.getAll();
  }

  ngOnInit() {
    this.allSubscribtion$ = this.serviceC.allSubscription.pipe(distinctUntilChanged()).subscribe( response => {
        if (response) {
          // this.response = response;
          console.log('Selector > ', response);
        }
      });
  }

  ngOnDestroy(): void {
    console.log('Unsubscribe Component C');
    this.allSubscribtion$.unsubscribe();
  }

}
