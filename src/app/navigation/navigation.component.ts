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

  /**
   * It open Or close the left navigation based on the navigation bar status
   */
  openNav() {
    this.status = !this.status;
    if (this.status == true) {
      this.leftContainerComponent.moveWidth();
    } else {
      this.leftContainerComponent.moveBackWidth();
    }
 }

 /**
  * It open the left navigation for task icon
  */
 openNavForList() {
   this.status = true;
   this.leftContainerComponent.moveWidth();
 }

 /**
  * Add new list name and created date ,list status
  * @param newList - It carry the new list name
  * @param newListTextBox - It carry the list text box property
  */
  addList(newList,newListTextBox) {
    var todoTask = {taskName:newList, checked: false, id: Date.now(), subTasks:[]};
    tasks.push(todoTask);
    this.leftContainerComponent.displayTaskName(todoTask);
    newListTextBox.value = null;
  }

  /**
   * It display list name from middle container
   * @param task - it carry the curren active task object
   */
  addSubTask(task) {
    this.leftContainerComponent.displayTaskName(task);
  }
    
}
