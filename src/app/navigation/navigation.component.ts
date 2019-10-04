import { Component, OnInit,Input } from '@angular/core';
import { tasks } from '../task';
import { LeftContainerComponent } from '../left-container/left-container.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() leftContainerComponent: LeftContainerComponent;
  constructor() {
   }
  status:boolean = false;
  tasks = tasks;
  ngOnInit() {
    
  }

  openNav() {
    this.status = !this.status;
    if (this.status == true) {
      this.leftContainerComponent.moveWidth();
    } else {
      this.leftContainerComponent.moveBackWidth();
    }
 }

 openNavForList() {
   this.status = true;
   this.leftContainerComponent.moveWidth();
 }

  addList(newList,newListTextBox) {
    var todoTask = {taskName:newList, checked: false, id: Date.now(), subTasks:[]};
    tasks.push(todoTask);
    this.leftContainerComponent.displayTaskName(todoTask);
    newListTextBox.value = " ";
  }
    
}
