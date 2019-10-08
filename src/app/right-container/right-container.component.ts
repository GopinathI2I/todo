import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss']
})
export class RightContainerComponent implements OnInit {
  rightContainerStatus:boolean = false;
  activeSubTask;
  constructor() { }

  ngOnInit() {
  }

  displaySubTaskName(existSubTask) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.activeSubTask = existSubTask;
    this.rightContainerStatus = true;
  }

}
