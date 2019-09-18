import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService as ServiceC } from '@lib-store-c';
import { Subscription } from 'rxjs';
import { LocalDataStorage } from '../../services/localDataStorage';

@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss']
})
export class ComponentCComponent implements OnInit, OnDestroy {

  public data: any;
  public localData: any;
  private allSubscription$: Subscription;

  constructor(public serviceC: ServiceC, private localDataStorage: LocalDataStorage) {
    // this.serviceC.getAll();
  }

  ngOnInit() {
    this.allSubscription$ = this.serviceC.allSubscription.subscribe(response => {
      if (!!response) {
        this.localData = response;

        // this.localDataStorage.setCachedItem('response', response);
      }
    });


  }

  public clear(): void {
    this.localDataStorage.clear();
  }

  public getItem() {
    this.localDataStorage.getCachedItem('api-data-store-3').subscribe( res => {
      this.data = res;
      console.log(res);
    });
  }

  public setItem() {
    this.localDataStorage.setCachedItem('api-data-store-3', this.localData).subscribe( result => console.log('Setting items: ', result));
  }

  public showKeys() {
    this.localDataStorage.getKeys().subscribe(keys => console.log('Keys stored in offline-store : ', keys));
  }

  ngOnDestroy(): void {
    this.allSubscription$.unsubscribe();
  }
}
