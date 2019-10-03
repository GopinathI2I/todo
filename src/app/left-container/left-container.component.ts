import { Component, OnInit, Inject, Input} from '@angular/core';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.scss']
})

export class LeftContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  
  

}

export function moveWidth() {
  document.getElementById("main").style.marginLeft = "300px";
}

export function moveBackWidth() {
  document.getElementById("main").style.marginLeft = "40px";
}
