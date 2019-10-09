import { Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss']
})
export class RightContainerComponent implements OnInit {
  rightContainerStatus:boolean = false;
  activeSubTask;
  steps;
  activeTask;
  constructor() { }

  ngOnInit() {
  }

  displaySubTaskName(existSubTask, activeTask) {
    this.activeSubTask = existSubTask;
    this.rightContainerStatus = true;
    this.displaySteps();
    this.activeTask = activeTask;
    console.log(this.activeTask);
  }

  addSteps(step, addStepTextBox) {
    var stepForSubTask = {stepName:step, checked:false, id:Date.now()};
    var existSteps = this.activeSubTask.steps;
    existSteps.push(stepForSubTask);
    this.steps = this.activeSubTask.steps;
    addStepTextBox.value = null;
  }

  displaySteps () {
    this.steps = this.activeSubTask.steps;
  }

  changeCheckedOrUnCheckedForStep(step, newDivForCircleIconStep) {
    if (step.checked == true) {
      step.checked = false;
    } else {
      step.checked = true;
    }
  }

  changeSubTaskStatus () {
    this.activeSubTask.checked = !this.activeSubTask.checked;
  }

  closeRightNavigation() {
    this.rightContainerStatus = false;
  }

  deleteCurrentSubTask() {
    var subTaskId = this.activeSubTask.id;
    var response = confirm("Are you sure to delete this task?");
    if (response == true) {
      this.activeTask.subTasks.splice(this.activeTask.subTasks.indexOf(this.activeSubTask),1);
      this.rightContainerStatus = false;
    }
  }

  updateSubTaskName(newSubTaskName, subTaskName) {
    console.log(newSubTaskName);
    console.log(subTaskName.innerText);
    this.activeSubTask.subTaskName = subTaskName.innerText;
  }



}
