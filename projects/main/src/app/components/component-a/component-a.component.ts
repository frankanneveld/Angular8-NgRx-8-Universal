import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {

  public response: any;

  constructor() {

  }

  ngOnInit() {


    // this.frankStoreService.allFrankSubscription.subscribe( response => {
    //   if (response) {
    //     this.response = response;
    //     // console.log(response);
    //   }
    // });
  }

}
