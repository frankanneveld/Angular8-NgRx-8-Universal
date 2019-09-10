import {Component, OnInit} from '@angular/core';
import {StoreService as ServiceC} from '@lib-store-c';

@Component({
  selector: 'app-component-c',
  templateUrl: './component-c.component.html',
  styleUrls: ['./component-c.component.scss']
})
export class ComponentCComponent implements OnInit {

  constructor(public storeService: ServiceC) {
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
