import { Component, OnInit} from '@angular/core';
import { tasks } from '../task';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.scss']
})

export class LeftContainerComponent implements OnInit {
  activeTask;
  newSubTasks;
  
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
    
  }

  addSubTask(newSubTaskName) {
    var subTask = {subTaskName:newSubTaskName, checked: false, id: Date.now(), steps:[]};
    for (let i of tasks) {
      if (i.taskname == this.activeTask.taskname) {
        let subTasks = i.subTasks;
        subTasks.push(subTask);
      }
    }
    this.newSubTasks = this.activeTask.subTasks;
  }
  



  
}
