import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService as ServiceC} from '@lib-store-c';
import {Subscription} from 'rxjs';
import {LocalDataStorage} from '../../services/localDataStorage';

@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss']
})
export class ComponentCComponent implements OnInit, OnDestroy {

  private allSubscription$: Subscription;
  public localData: any;

  constructor(public serviceC: ServiceC, private localDataStorage: LocalDataStorage) {
    this.serviceC.getAll();
  }

  ngOnInit() {
    this.allSubscription$ = this.serviceC.allSubscription.subscribe(response => {
      if (response) {
        this.localDataStorage.setItem('response', response);
        console.log('Selector > ', response);

        this.localDataStorage.getItem('response').subscribe( res => {
          this.localData = res;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.allSubscription$.unsubscribe();
  }


}
