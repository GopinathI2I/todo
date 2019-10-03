import { Component, OnInit } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { moveWidth } from '../left-container/left-container.component';
import { moveBackWidth } from '../left-container/left-container.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor() { }
  status:boolean = false;
  ngOnInit() {
    
  }

  openNav() {
    this.status = !this.status;
    console.log(this.status);
    if (this.status == true) {
      moveWidth();
    } else {
      moveBackWidth();
    }
 }
    
}
