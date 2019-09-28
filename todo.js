var tasks = [];
var currentSubTask = [];

init();
/**
 * it Initialize the listener
 */
function init() {
    getSelectedElementById("closeNavForStep").addEventListener("click", closeStepsNavigation);
    getSelectedElementById("subTaskName").addEventListener("click", enableContentEditable);
    getSelectedElementById("plus").addEventListener("click", openNavForNewList);
    getSelectedElementById("deleteSubTask").addEventListener("click", deleteSubTask);
    getSelectedElementById("openbtn").addEventListener("click", openNav);
    getSelectedElementById('subTaskName').addEventListener('keypress', getSubTaskName);
    getSelectedElementById('subTaskName').addEventListener('keypress', addSubTaskName);
    getSelectedElementById('addStepContent').addEventListener('keypress', addStepContent);
    getSelectedElementById('addSubTaskContent').addEventListener('keypress', addSubTaskContent);
    getSelectedElementById('newListTextBox').addEventListener('keypress', addNewList);
    getSelectedElementById("cicleSymbolForStep").addEventListener("click", displayCircle);
} 

/**
 * it enable the content editable 
 */
function enableContentEditable() {
    getSelectedElementById("subTaskName").contentEditable = true;
}

/**
 * use to close right navigation
 */
function closeStepsNavigation() {
    getSelectedElementById("rightDiv").style.display = "none";
}

/**
 * get the element value for particular element
 */
function getValueById(elementId) {
    return document.getElementById(elementId).value;
}

/**
 * display checked or unchecked circles based on the  conditions
 */
function displayCircle(event) {
    var className = event.target.className;
    if (className == "fa fa-check-circle") {
        currentSubTask[0].checked = false;
        getSelectedElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
        getSelectedElementById("subTaskName").style.textDecoration = "none";
        var circleIcon = getSelectedElementById("cicleSymbolForStep");
        circleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        displaySubTaskForList();
        
    } else {
        currentSubTask[0].checked = true;
        getSelectedElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
        getSelectedElementById("subTaskName").style.textDecoration = "line-through";
        var circleIcon = getSelectedElementById("cicleSymbolForStep");
        circleIcon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
        displaySubTaskForList();
    }
}
    
/**
 * Add the new list if enter key is pressed
 */
function addNewList() {
    if (event.keyCode == 13) {
        var newTask = document.createElement("LI");
        var newTasks = getValueById("newListTextBox");
        var task = document.createTextNode(newTasks);
        if (newTasks ==  " ") {
            getSelectedElementById("newListTextBox").value = "";
        } else {
            addTask(newTasks);
            getSelectedElementById("newListTextBox").value = "";
        } 
    }
}

/**
 * display sub task name in step navigation side
 */
function addSubTaskContent() {
    if (event.keyCode == 13) {
        var subTasks = getValueById("addSubTaskContent");
        addSubTask(subTasks);
    }
}

/**
 * display step names 
 */
function addStepContent() {
    if (event.keyCode == 13) {
        var step = getValueById("addStepContent");
        addSteps(step);
    }
}

/**
 * use to add the sub task name into middle layer
 */
function addSubTaskName() {
    if (event.keyCode == 13) {
        var subtaskName = getSelectedElementById("subTaskName").innerText;
        currentSubTask[0].subTaskName = subtaskName;
        displaySubTaskForList();
        getSelectedElementById("subTaskName").contentEditable = false;
    }
}

/**
 * Over write the sub task name for newly entered sub task name
 */
function getSubTaskName() {
    if (event.keyCode == 13) {
        var subtaskName = getSelectedElementById("subTaskName").innerText;
        currentSubTask[0].subTaskName = subtaskName;
        displaySubTaskForList();
        getSelectedElementById("subTaskName").contentEditable = false;
    }
}
       
/**
 * delete the subtask if user press delete icon and confirm to of
 */ 
function deleteSubTask() {
    var activeTask = getActiveTask();
    var existSubTask = activeTask.subTasks;
    var response = confirm("Are you sure to delete this task?");
    if (response == true) {
        currentSubTask[0].status = true;
        displaySubTaskForList();
        getSelectedElementById("rightDiv").style.display = "none";
        
    }   
}

/**
 * Use to create element based on requirement
 */
function createElement(elementName) {
    return  document.createElement(elementName);
}

/**
 * It set the id for particular element
 */
function setAttribute(elementName, setId, id) {
    elementName.setAttribute(setId, id);
}

/**
 * Add the task name and append the new div into current div for task
 */
function addTask(newTasks) {
    var uniqueTaskName = checkListTitle(newTasks);
    var todoTask = {taskName:newTasks, checked: false, id: Date.now(), subTasks:[]};
    var id = todoTask.id;
    tasks.push(todoTask);
    getSelectedElementById("text-content").textContent = newTasks;
    createElementForList(id, newTasks);
    displayTaskName(id);
    displaySubTaskForList();
    getSelectedElementById("rightDiv").style.display = "none";
}

/**
 * create the element for task and append into new div
 */
function createElementForList(id, newTasks) {
    var newDiv = createElement("div"); 
    setAttribute(newDiv,"id", id);
    newDiv.style.width = "45px";
    newDiv.classList.add("newTasks");
    var currentDiv = getSelectedElementById("addTask"); 
    newDiv.style.display="flex";
    newDiv.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>';
    var newSpan = createElement("span");
    setAttribute(newSpan, "id", id);
    newSpan.classList.add("newSpan");
    newSpan.innerHTML = newTasks;
    newDiv.appendChild(newSpan);
    currentDiv.appendChild(newDiv);
}

/**
 * Use to get active task
 */
function getActiveTask() {
    var listName = getSelectedElementById("text-content").textContent;
    var existList = tasks.find(function(element) { 
    return element.taskName == listName; 
    });
    return existList;
}
    
/**
 * Display task names into the side navidation bar
 */
function displayTaskName(id) {
    getSelectedElementById(id).addEventListener("click", function(event) {
      var targetId = event.target.id;
      var currentTask = tasks.find(function(taskEvent) {
          return taskEvent.id == targetId;
      });
    getSelectedElementById("text-content").textContent = currentTask.taskName;
    displaySubTaskForList();
    getSelectedElementById("rightDiv").style.display = "none";
});
}

/**
 * Use to display the sub task that present in current task
 */
function displaySubTaskForList() {
    var listName = getSelectedElementById("text-content").textContent;
    var existList = tasks.find(function(element) { 
    return element.taskName == listName; 
    }); 
    var existSubTasks = existList.subTasks; 
    getSelectedElementById("addSubTask").innerHTML = "";
    for (var i = 0; i < existSubTasks.length; i++) {
        var findedSubTask = existSubTasks[i];
        var id = findedSubTask[0].id;
        if (findedSubTask[0].status == false) { 
            var newDiv = createElement("div"); 
            setAttribute(newDiv, "id", id); 
            var newDivForCircleIcon = createElement("div");
            var newSpan = createElement("p");
            newSpan.classList.add("newSpanForSubTask");
            setAttribute(newSpan, "id", id);
            if (findedSubTask[0].checked == false) {
                newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
                setAttribute(newDivForCircleIcon, "circleId", id);
                newSpan.style.textDecoration = "none";
            } else {
                newDivForCircleIcon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
                setAttribute(newDivForCircleIcon, "circleId", id);
                newSpan.style.textDecoration = "line-through";
            }
            newDivForCircleIcon.classList.add("circleDiv");
            newDiv.classList.add("newTasks");
            var newLineBreakDiv = createElement("div");
            newLineBreakDiv.style.display="flex";
            newLineBreakDiv.classList.add("line");
            newDiv.style.display="flex";
            newDiv.classList.add("addSubTask");
            var currentDiv = getSelectedElementById("addSubTask"); 
            getSelectedElementById("addSubTask").style.width = "300px";
            getSelectedElementById("addSubTask").style.color = "#0078D7"; 
            newSpan.innerHTML = findedSubTask[0].subTaskName;
            newDiv.appendChild(newDivForCircleIcon);
            newDiv.appendChild(newLineBreakDiv);
            newDiv.appendChild(newSpan);
            currentDiv.appendChild(newDiv);
            displaySubTaskName(id);
            getSelectedElementById("addSubTaskContent").value = "";
        }
    }
}

/**
 * Use to display the step that present in current sub task
 */
function displayStepForSubList() {
    var currentSteps = currentSubTask[0].step;
    getSelectedElementById("addSteps").innerHTML = "";
    for (var i = 0; i <  currentSteps.length; i++) {
        var id = currentSteps[i].id;
        var newSpan = createElement("p");
        setAttribute(newSpan, "id", id);
        newSpan.classList.add("newSpanForStep");
        var newDivForCircleIconStep = createElement("div");
        newDivForCircleIconStep.classList.add("newDivForCircleIconStep");
        if (currentSteps[i].checked == false) {
            newDivForCircleIconStep.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
            setAttribute(newDivForCircleIconStep, "id", id);
            newSpan.style.textDecoration = "none";
        } else {
            newDivForCircleIconStep.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
            setAttribute(newDivForCircleIconStep, "id", id);
            newSpan.style.textDecoration = "line-through";
        }
        var newDiv = createElement("div"); 
        setAttribute(newDiv, "id", id);
        newDiv.classList.add("newstep");
        var newLineBreakDiv = createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("stepsLine");
        var currentDiv = getSelectedElementById("addSteps"); 
        getSelectedElementById("addSteps").style.width = "500px";
        getSelectedElementById("addSteps").style.color = "#0078D7"; 
        newSpan.innerHTML = currentSteps[i].stepName;
        newDiv.appendChild(newDivForCircleIconStep);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        getSelectedElementById("addStepContent").value = "";
        changedCheckedOrUncheckedForStep(id);
    }
}

/**
 * Add the new step into current sub task
 */
function addSteps(step) {
    if (step === " ") {
       getSelectedElementById("addStepContent").value = "";
    } else {
        var comment = " ";
        var stepForSubTask = {stepName:step, checked:false, id:Date.now(), comment:comment};
        var id = stepForSubTask.id;
        var createdStep = [];
        createdStep.push(stepForSubTask);
        currentSubTask[0].step.push(stepForSubTask);
        var newDiv = createElement("div"); 
        setAttribute(newDiv, "id", id);
        var newDivForCircleIconStep = createElement("div");
        newDivForCircleIconStep.classList.add("newDivForCircleIconStep");
        setAttribute(newDivForCircleIconStep, "id", id);
        newDivForCircleIconStep.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        newDiv.classList.add("newstep");
        var newLineBreakDiv = createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("stepsLine");
        var currentDiv = getSelectedElementById("addSteps"); 
        getSelectedElementById("addSteps").style.width = "500px";
        getSelectedElementById("addSteps").style.color = "#0078D7"; 
        var newSpan = createElement("p");
        setAttribute(newSpan, "id", id); 
        newSpan.classList.add("newSpanForStep");
        newSpan.innerHTML = step;
        newDiv.appendChild(newDivForCircleIconStep);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        getSelectedElementById("addStepContent").value = "";
        changedCheckedOrUncheckedForStep(id);
    }
}

/** 
 * It change the unchecked circle into checked circle or checked circle into unChecked circle
 * based on the conditions
 */
function changedCheckedOrUncheckedForStep(id) {
    getSelectedElementById(id).addEventListener("click", function(event) {
    var targetId = event.target.id;
    var elementClassName = event.target.className;
    var targetId = event.target.id;
    if (elementClassName == "fa fa-circle-thin") {
        changedUncheckedIntoChecked(id, "newSpanForStep", "line-through", "newDivForCircleIconStep");
        changeStepStatusIntoTrue(id);
    } else if (elementClassName == "fa fa-check-circle") {
        changedUncheckedIntoChecked(id, "newSpanForStep", "none", "newDivForCircleIconStep");
        changeStepStatusIntoFalse(id);
    }
});
}

/** 
 * It change the status into true if circle is change checked 
 */
function changeStepStatusIntoTrue(id) {
    var existSteps = currentSubTask[0].step;
    for (var i = 0 ; i < existSteps.length; i++) {
        if (id == existSteps[i].id) {
            existSteps[i].checked = true;
        } 
    }
}

/** 
 * It change the status into false if circle is change unChecked 
 */
function changeStepStatusIntoFalse(id) {
    var existSteps = currentSubTask[0].step;
    for (var i = 0 ; i < existSteps.length; i++) {
        if (id == existSteps.id) {
            existSteps[i].checked = false;
        } 
    }
}
        
    
/**
 * It add the sub task into current active task
 */
function addSubTask(subTasks) {
    if (subTasks ===  " ") {
        getSelectedElementById("addSubTaskContent").value = "";
    } else {
        var listName = getSelectedElementById("text-content").textContent;
        var existList = tasks.find(function(element) { 
        return element.taskName == listName; 
        }); 
        var subTask = {subTaskName:subTasks, checked: false, id: Date.now(), step:step = [], status:false};
        var id = subTask.id;
        var createdSubTasks = []; 
        createdSubTasks.push(subTask);
        existList.subTasks.push(createdSubTasks);
        var newDiv = createElement("div"); 
        setAttribute(newDiv, "id", id); 
        var newDivForCircleIcon = createElement("div");
        setAttribute(newDivForCircleIcon, "circleId", id);
        newDivForCircleIcon.classList.add("circleDiv");
        newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        newDiv.classList.add("newTasks");
        var newLineBreakDiv = createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("line");
        newDiv.style.display="flex";
        newDiv.classList.add("addSubTask");
        var currentDiv = getSelectedElementById("addSubTask"); 
        var newSpan = createElement("p");
        setAttribute(newSpan, "id", id); 
        newSpan.classList.add("newSpanForSubTask");
        newSpan.innerHTML = subTasks;
        newDiv.appendChild(newDivForCircleIcon);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        displaySubTaskName(id);
        getSelectedElementById("addSubTaskContent").value = "";
   } 
}

/**
 * Use to display sub task name  that present in curent active task
 */
function displaySubTaskName(id) {
    getSelectedElementById(id).addEventListener("click", function(event) {
    var elementClassName = event.target.className;
    var targetId = event.target.id;
    var currentTask = getActiveTask();
    var existSubTasks = currentTask.subTasks;
    findCurrentSubTask(existSubTasks, id);
    if ((elementClassName == "circleDiv") || (elementClassName == "fa fa-circle-thin")) {
        changedUncheckedIntoChecked(id, "newSpanForSubTask", "line-through", "circleDiv");
        currentSubTask[0].checked = true;
        findCheckedOrNot();
        displayStepForSubList();
    } else if ((elementClassName == "circleDiv") || (elementClassName == "fa fa-check-circle")) {
        changedCheckedIntoUnchecked(id, "newSpanForSubTask", "none", "circleDiv")
        currentSubTask[0].checked = false;
        findCheckedOrNot();
        displayStepForSubList();
    } else {
        for (var i = 0; i < existSubTasks.length; i++) {
            var findedSubTask = existSubTasks[i];
            if (findedSubTask[0].id == targetId) {
                currentSubTask = findedSubTask;
                getSelectedElementById("rightDiv").style.display = "block";
                findCheckedOrNot();
                displayStepForSubList();
            }
        }
        displayStepForSubList();
    } 
    });
}

/**
 * Use to find out if circle is checked or not
 */
function findCheckedOrNot() {
    if (currentSubTask[0].checked == false) {
        getSelectedElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
        getSelectedElementById("subTaskName").style.textDecoration = "none";
        var circleIcon = getSelectedElementById("cicleSymbolForStep");
        circleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
    } else {
        getSelectedElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
        getSelectedElementById("subTaskName").style.textDecoration = "line-through";
        var circleIcon = getSelectedElementById("cicleSymbolForStep");
        circleIcon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    }
}
        

/**
 * Use to find the currnt subtask
 */        
function findCurrentSubTask(existSubTasks, id) {
    for (var i = 0; i < existSubTasks.length; i++) {
        var findedSubTask = existSubTasks[i];
        if (findedSubTask[0].id == id) {
            currentSubTask = findedSubTask;
        }
    }
}

/**
 * It change the  unchecked circle into  checked circle
 */
function changedUncheckedIntoChecked(id, className, displayStyle, clasNameForCircleDiv) {
    getElementForTextDecoration(id, className, displayStyle);
    var icon =  getSelectedElementById(id).getElementsByClassName(clasNameForCircleDiv)[0];
    icon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
}

/**
 * It change the  checked circle into unchecked circle
 */
function changedCheckedIntoUnchecked(id, className, displayStyle, clasNameForCircleDiv) {
    getSelectedElementById("subTaskName").style.textDecoration = "none";
    getElementForTextDecoration(id, className, displayStyle);
    var icon =  getSelectedElementById(id).getElementsByClassName(clasNameForCircleDiv)[0];
    icon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
}

/**
 * It display the text into strike throw or normal text format based on the parameter
 */
function getElementForTextDecoration(id, classNameName, displayStyle) {
    getSelectedElementById(id).getElementsByClassName(classNameName)[0].style.textDecoration = displayStyle;
}

/**
 * Use to get all elements based on element
 */
function getAllElementInQuerySelector(element) {
    return document.querySelectorAll(element);
}

/**
 * Hide or show the menu based on the display style
 */
function hideOrShowNewList(taskName,displayStyle) {
    for (var i=0; i<=taskName.length; i++) {
        taskName[i].style.display = displayStyle;
    }
}

/**
 * Get particular element based on the id
 */
function getSelectedElementById(elementId) {
    return document.getElementById(elementId);
}
    
/**
 * It open the side navigation bar based on the style width
 */ 
function openNav() {
    var element = getSelectedElementById("navigation");
    var taskName = getAllElementInQuerySelector("span");
    if (element.style.width == "300px") {
        getSelectedElementById("main").style.marginLeft= "0";
        element.style.width = "45px";
        showOrHideMenu("important_menu,day_menu,planned_menu,tasks_menu,userMenu,newListTextBox","none");
        hideOrShowNewList(taskName,"none");
    } else {
        openNavForNewList();
    }       
}

/**
 * It open the side navigation bar based on the style width and if new list is pressed
 */
function openNavForNewList() {
    var taskName = getAllElementInQuerySelector("span"); 
   getSelectedElementById("main").style.marginLeft = "300px";
    var element = getSelectedElementById("navigation");
    element.style.width = "300px";
    showOrHideMenu("important_menu,day_menu,planned_menu,tasks_menu,userMenu,newListTextBox","block");
    hideOrShowNewList(taskName,"block");
}   

/**
 * It check the title name is already exist or not
 * If it already exist it increment the one into original value
 */
function checkListTitle(title) {
   var list = tasks.filter(function(task) {
       if(task.taskName.includes("(")) {
           return title === task.taskName.slice(0, task.taskName.indexOf("("));
       } else {
           return task.taskName === title;
       }
   });
   let size = list.length;
   if(0 == size) {
       return title;
   } else {
       return (title+"("+size+")");
   }
}

/**
 * It show or hide the list based on the display style
 */
function showOrHideMenu() {
    var sideNavMenu = arguments[0].split(',');
    for (var i = 0; i < sideNavMenu.length; i++) {
        getSelectedElementById(sideNavMenu[i]).style.display = arguments[1];
    }
}












