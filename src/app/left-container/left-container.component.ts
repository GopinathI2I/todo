import { Component, OnInit,Input} from '@angular/core';
import { tasks } from '../task';
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
  checkedCircleStatus:boolean = false;
  
  constructor() { }
  taskStatus:boolean = false;
  ngOnInit() {
    
  }
  
  moveWidth() {
    document.getElementById("main").style.marginLeft = "300px";
  }

  moveBackWidth() {
    document.getElementById("main").style.marginLeft = "40px";
  }

  displayTaskName(newTask) {
    this.activeTask = newTask;
    this.displaySubTask(this.activeTask.subTasks);
    
  }

  displaySubTask(existSubTask) {
    this.newSubTasks = existSubTask;
  }

  addSubTask(newSubTaskName, addSubTaskContent) {
    var subTask = {subTaskName:newSubTaskName, checked: false, id: Date.now(), steps:[]};
    var activeSubTask = this.activeTask.subTasks;
    activeSubTask.push(subTask);
    this.newSubTasks = this.activeTask.subTasks;
    addSubTaskContent.value = null;
  }

  changeCheckedOrUnCheckedForSubTask(subTask, circleForSubTask) {
    if (subTask.checked == true) {
      subTask.checked = false;
    } else {
      subTask.checked = true;
    }

  }
  
   addSteps(existSubTask, activeTask) {
    this.rightContainerComponent.displaySubTaskName(existSubTask, activeTask);
   }
}
