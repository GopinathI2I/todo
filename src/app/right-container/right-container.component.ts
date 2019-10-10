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

  /**
   * Use to display sub task name on Right container
   * @param existSubTask - it carry the current sub task
   * @param activeTask - it carry the active sub task information
   */
  displaySubTaskName(existSubTask, activeTask) {
    this.activeSubTask = existSubTask;
    this.rightContainerStatus = true;
    this.displaySteps();
    this.activeTask = activeTask;
  }


  /**
   * Add the steps name created step date and status of the step
   * @param step - it carry the step name
   * @param addStepTextBox - it carry the textbox property for step
   */
  addSteps(step, addStepTextBox) {
    var stepForSubTask = {stepName:step, checked:false, id:Date.now()};
    var existSteps = this.activeSubTask.steps;
    existSteps.push(stepForSubTask);
    this.steps = this.activeSubTask.steps;
    addStepTextBox.value = null;
  }

  /**
   * Use to display steps for current sub task
   */
  displaySteps () {
    this.steps = this.activeSubTask.steps;
  }

  /**
   * It change the circle for based on the circle status
   * @param step - it carry the current clicable step
   * @param newDivForCircleIconStep - It carry the property for the circle  div
   */
  changeCheckedOrUnCheckedForStep(step, newDivForCircleIconStep) {
    if (step.checked == true) {
      step.checked = false;
    } else {
      step.checked = true;
    }
  }

  /**
   * It change the active sub task status
   */
  changeSubTaskStatus () {
    this.activeSubTask.checked = !this.activeSubTask.checked;
  }

  /**
   * It close the right navigation based o the navigation status
   */
  closeRightNavigation() {
    this.rightContainerStatus = false;
  }

  /**
   * It delete the current sub task based on the click event 
   */
  deleteCurrentSubTask() {
    var subTaskId = this.activeSubTask.id;
    var response = confirm("Are you sure to delete this task?");
    if (response == true) {
      this.activeTask.subTasks.splice(this.activeTask.subTasks.indexOf(this.activeSubTask),1);
      this.rightContainerStatus = false;
    }
  }

  /**
   * Update current sub task name into new subtask name
   * @param newSubTaskName - It carry the new sub task name
   * @param subTaskName - It carry the subtask name div property
   */
  updateSubTaskName(newSubTaskName, subTaskName) {
    this.activeSubTask.subTaskName = subTaskName.innerText;
  }



}
