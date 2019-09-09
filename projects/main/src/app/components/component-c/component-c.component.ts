import { Component, OnInit } from '@angular/core';
import {StoreService} from '@lib-store-c';

@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss']
})
export class ComponentCComponent implements OnInit {

  constructor(public storeService: StoreService) {
    this.storeService.getAll();
  }

  ngOnInit() {
    this.storeService.allSubscription.subscribe( response => {
        if (response) {
          // this.response = response;
          console.log(response);
        }
      });
  }

}
