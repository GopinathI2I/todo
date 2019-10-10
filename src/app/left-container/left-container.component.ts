import { Component, OnInit,Input} from '@angular/core';
import { RightContainerComponent } from '../right-container/right-container.component';
@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.scss']
})

export class LeftContainerComponent implements OnInit {
  @Input() rightContainerComponent: RightContainerComponent;
  activeTask;
  newSubTasks;
  circleStatus:boolean = true;
  middleContainerStatus:boolean = false;
  checkedCircleStatus:boolean = false;
  
  constructor() { }
  taskStatus:boolean = false;
  ngOnInit() {
    
  }
  
  /**
   * Move the middle container 
   */
  moveWidth() {
    this.middleContainerStatus = true;
  }

  /**
   * It move back the middle div into original position
   */
  moveBackWidth() {
    this.middleContainerStatus = false;
  }

  /**
   * It display current task name
   * @param newTask - it carry th new task name
   */
  displayTaskName(newTask) {
    this.activeTask = newTask;
    this.displaySubTask(this.activeTask.subTasks);
  }

  /**
   * display active task of sub task
   * @param existSubTask It carry the list of sub tasks for based on active task
   */
  displaySubTask(existSubTask) {
    this.newSubTasks = existSubTask;
  }

  /**
   * Add the new sub task name and id , status into active task
   * @param newSubTaskName - it carry the new sub task name
   * @param addSubTaskContent - It carry the text box property for sub task
   */
  addSubTask(newSubTaskName, addSubTaskContent) {
    var subTask = {subTaskName:newSubTaskName, checked: false, id: Date.now(), steps:[]};
    var activeSubTask = this.activeTask.subTasks;
    activeSubTask.push(subTask);
    this.newSubTasks = this.activeTask.subTasks;
    addSubTaskContent.value = null;
  }
 
  /**
   * It change the sub task status based on the status
   * @param subTask - It carry the clicable sub task information
   * @param circleForSubTask - It carry the div property for sub task
   */
  changeCheckedOrUnCheckedForSubTask(subTask, circleForSubTask) {
    if (subTask.checked == true) {
      subTask.checked = false;
    } else {
      subTask.checked = true;
    }

  }
  
   /**
    * It display the sub task name on right container
    * @param existSubTask - It carry the exist sub task information
    * @param activeTask - It carry the active sub task information 
    */
   addSteps(existSubTask, activeTask) {
    this.rightContainerComponent.displaySubTaskName(existSubTask, activeTask);
   }
}
