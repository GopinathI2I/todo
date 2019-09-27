document.getElementById("openbtn").addEventListener("click", openNav);
document.getElementById("closeNavForStep").addEventListener("click", function() {
    document.getElementById("rightDiv").style.display = "none";
});

document.getElementById("subTaskName").addEventListener("click", function() {
    document.getElementById("subTaskName").contentEditable = true;
});
    
document.getElementById("plus").addEventListener("click", openNavForNewList);
document.getElementById('newListTextBox').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
            var newTask = document.createElement("LI");
            var newTasks = document.getElementById("newListTextBox").value;
            var task = document.createTextNode(newTasks);
            console.log(newTasks);
            if (newTasks ==  " ") {
                document.getElementById("newListTextBox").value = " ";
            } else {
                addTask(newTasks);
                document.getElementById("newListTextBox").value = " ";
            } 
        }
    });

document.getElementById('addSubTaskContent').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
            var subTasks = document.getElementById("addSubTaskContent").value;
            console.log(subTasks);
            addSubTask(subTasks);
        }
    });

document.getElementById('addStepContent').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
            var step = document.getElementById("addStepContent").value;
            console.log(step);
            addSteps(step);
        }
    });

document.getElementById('subTaskName').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        var subtaskName = document.getElementById("subTaskName").innerText;
        currentSubTask[0].subTaskName = subtaskName;
        displaySubTaskForList();
        document.getElementById("subTaskName").contentEditable = false;
    }
});
        

var tasks = [];
var currentSubTask = [];
function addTask(newTasks) {
    var uniqueTaskName = checkListTitle(newTasks);
    var todoTask = {taskName:newTasks, checked: false, id: Date.now(), subTasks:[]};
    var id = todoTask.id;
    tasks.push(todoTask);
    document.getElementById("text-content").textContent = newTasks;
    var newDiv = document.createElement("div"); 
    newDiv.setAttribute("id", id);
    newDiv.style.width = "45px";
    newDiv.classList.add("newTasks");
    var currentDiv = document.getElementById("addTask"); 
    newDiv.style.display="flex";
    newDiv.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>';
    var newSpan = document.createElement("span");
    newSpan.setAttribute("id", id);
    newSpan.classList.add("newSpan");
    newSpan.innerHTML = newTasks;
    newDiv.appendChild(newSpan);
    currentDiv.appendChild(newDiv);
    displayTaskName(id);
    console.log(tasks);
    displaySubTaskForList();
    document.getElementById("rightDiv").style.display = "none";
}

function getActiveTask() {
    var listName = document.getElementById("text-content").textContent;
    var existList = tasks.find(function(element) { 
    return element.taskName == listName; 
    });
    return existList;
}
    

function displayTaskName(id) {
    document.getElementById(id).addEventListener("click", function(event) {
      var targetId = event.target.id;
      console.log(targetId);
      var currentTask = tasks.find(function(taskEvent) {
          return taskEvent.id == targetId;
      });
    document.getElementById("text-content").textContent = currentTask.taskName;
    displaySubTaskForList();
    document.getElementById("rightDiv").style.display = "none";
});
}

function displaySubTaskForList() {
    console.log("SFDDS");
    var listName = document.getElementById("text-content").textContent;
    var existList = tasks.find(function(element) { 
    return element.taskName == listName; 
    }); 
    var existSubTasks = existList.subTasks; 
    if (existSubTasks.length == 0) {
        console.log(existSubTasks);
        document.getElementById("addSubTask").innerHTML = " ";
        return;
    } else { 
        document.getElementById("addSubTask").innerHTML = " ";
        console.log(existSubTasks.length);
        for (var i = 0; i < existSubTasks.length; i++) {
            var findedSubTask = existSubTasks[i];
            var id = findedSubTask[0].id;
            var newDiv = document.createElement("div"); 
            newDiv.setAttribute("id", id); 
            var newDivForCircleIcon = document.createElement("div");
            var subTaskName = findedSubTask[0].subTaskName;
            var newSpan = document.createElement("p");
            newSpan.classList.add("newSpanForSubTask");
            newSpan.setAttribute("id", id);
            if (findedSubTask[0].checked == false) {
                newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
                newDivForCircleIcon.setAttribute("circleId", id);
                newSpan.style.textDecoration = "none";
            } else {
                newDivForCircleIcon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
                newDivForCircleIcon.setAttribute("circleId", id);
                newSpan.style.textDecoration = "line-through";
            }
            newDivForCircleIcon.classList.add("circleDiv");
            newDiv.classList.add("newTasks");
            var newLineBreakDiv = document.createElement("div");
            newLineBreakDiv.style.display="flex";
            newLineBreakDiv.classList.add("line");
            newDiv.style.display="flex";
            newDiv.classList.add("addSubTask");
            var currentDiv = document.getElementById("addSubTask"); 
            document.getElementById("addSubTask").style.width = "300px";
            document.getElementById("addSubTask").style.color = "#0078D7"; 
            console.log(findedSubTask[0]);
            newSpan.innerHTML = findedSubTask[0].subTaskName;
            newDiv.appendChild(newDivForCircleIcon);
            newDiv.appendChild(newLineBreakDiv);
            newDiv.appendChild(newSpan);
            currentDiv.appendChild(newDiv);
            displaySubTaskName(id);
            document.getElementById("addSubTaskContent").value = " ";
        }
    }
}

function displayStepForSubList() {
    var clickableSubTask = currentSubTask;
    console.log(clickableSubTask);
    var currentSteps = clickableSubTask[0].step;
    console.log(currentSteps);
    console.log(currentSteps.length);
    if (currentSteps.length == 0) {
        document.getElementById("addSteps").innerHTML = " ";
        return;
    } else { 
        document.getElementById("addSteps").innerHTML = " ";
    for (var i = 0; i <  currentSteps.length; i++) {
        console.log(currentSteps);
        console.log(currentSteps[0]);
        var id = currentSteps[i].id;
        var newDiv = document.createElement("div"); 
        newDiv.setAttribute("id", id);
        var newSpan = document.createElement("p");
        newSpan.setAttribute("id", id);
        newSpan.classList.add("newSpanForStep");
        var newDivForCircleIconStep = document.createElement("div");
        newDivForCircleIconStep.classList.add("newDivForCircleIconStep");
        if (currentSteps[i].checked == false) {
            newDivForCircleIconStep.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
            newDivForCircleIconStep.setAttribute("id", id);
            newSpan.style.textDecoration = "none";
        } else {
            newDivForCircleIconStep.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
            newDivForCircleIconStep.setAttribute("id", id);
            newSpan.style.textDecoration = "line-through";
        }
        newDiv.classList.add("newstep");
        var newLineBreakDiv = document.createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("stepsLine");
        var currentDiv = document.getElementById("addSteps"); 
        document.getElementById("addSteps").style.width = "500px";
        document.getElementById("addSteps").style.color = "#0078D7"; 
        console.log(currentSteps[0].stepName);
        newSpan.innerHTML = currentSteps[i].stepName;
        newDiv.appendChild(newDivForCircleIconStep);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        document.getElementById("addStepContent").value = " ";
        changedCheckedOrUncheckedForStep(id);
    }
    }
}

function addSteps(step) {
    console.log(step);
    if (step === " ") {
       document.getElementById("addStepContent").value = " ";
    } else {
        var comment = " ";
        var stepForSubTask = {stepName:step, checked:false, id:Date.now(), comment:comment};
        var id = stepForSubTask.id;
        var createdStep = [];
        createdStep.push(stepForSubTask);
        console.log(currentSubTask);
        currentSubTask[0].step.push(stepForSubTask);
        console.log(currentSubTask);
        var newDiv = document.createElement("div"); 
        newDiv.setAttribute("id", id);
        var newDivForCircleIconStep = document.createElement("div");
        newDivForCircleIconStep.classList.add("newDivForCircleIconStep");
        newDivForCircleIconStep.setAttribute("id", id);
        newDivForCircleIconStep.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        newDiv.classList.add("newstep");
        var newLineBreakDiv = document.createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("stepsLine");
        var currentDiv = document.getElementById("addSteps"); 
        document.getElementById("addSteps").style.width = "500px";
        document.getElementById("addSteps").style.color = "#0078D7"; 
        var newSpan = document.createElement("p");
        newSpan.setAttribute("id", id); 
        newSpan.classList.add("newSpanForStep");
        newSpan.innerHTML = step;
        newDiv.appendChild(newDivForCircleIconStep);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        document.getElementById("addStepContent").value = " ";
        changedCheckedOrUncheckedForStep(id);
    }
}

function changedCheckedOrUncheckedForStep(id) {
    document.getElementById(id).addEventListener("click", function(event) {
    var targetId = event.target.id;
    console.log(targetId);
    console.log(currentSubTask[0].step);
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

function changeStepStatusIntoTrue(id) {
    console.log(id);
    var existSteps = currentSubTask[0].step;
    console.log(existSteps);
    for (var i = 0 ; i < existSteps.length; i++) {
        console.log(existSteps[i].id);
        if (id == existSteps[i].id) {
            existSteps[i].checked = true;
            console.log(existSteps);
        } 
    }
}

function changeStepStatusIntoFalse(id) {
    console.log(id);
    var existSteps = currentSubTask[0].step;
    console.log(existSteps);
    for (var i = 0 ; i < existSteps.length; i++) {
        console.log(existSteps.id);
        if (id == existSteps.id) {
            existSteps[i].checked = false;
            console.log(existSteps);
        } 
    }
}
        
    

function addSubTask(subTasks) {
    console.log(subTasks);
    if (subTasks ===  " ") {
        document.getElementById("addSubTaskContent").value = " ";
    } else {
        var listName = document.getElementById("text-content").textContent;
        var existList = tasks.find(function(element) { 
        return element.taskName == listName; 
        }); 
        var subTask = {subTaskName:subTasks, checked: false, id: Date.now(), step:step = []};
        var id = subTask.id;
        console.log(id);
        var createdSubTasks = []; 
        createdSubTasks.push(subTask);
        existList.subTasks.push(createdSubTasks);
        var newDiv = document.createElement("div"); 
        newDiv.setAttribute("id", id); 
        var newDivForCircleIcon = document.createElement("div");
        newDivForCircleIcon.setAttribute("circleId", id);
        newDivForCircleIcon.classList.add("circleDiv");
        newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        newDiv.classList.add("newTasks");
        var newLineBreakDiv = document.createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("line");
        newDiv.style.display="flex";
        newDiv.classList.add("addSubTask");
        var currentDiv = document.getElementById("addSubTask"); 
        var newSpan = document.createElement("p");
        newSpan.setAttribute("id", id); 
        newSpan.classList.add("newSpanForSubTask");
        newSpan.innerHTML = subTasks;
        newDiv.appendChild(newDivForCircleIcon);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        displaySubTaskName(id);
        document.getElementById("addSubTaskContent").value = " ";
   } 
}


function displaySubTaskName(id) {
    document.getElementById(id).addEventListener("click", function(event) {
    var elementClassName = event.target.className;
    var targetId = event.target.id;
    var currentTask = getActiveTask();
    var existSubTasks = currentTask.subTasks;
    findCurrentSubTask(existSubTasks, id);
    if ((elementClassName == "circleDiv") || (elementClassName == "fa fa-circle-thin")) {
        changedUncheckedIntoChecked(id, "newSpanForSubTask", "line-through", "circleDiv");
        currentSubTask[0].checked = true;
        console.log(currentTask);
        findCheckedOrNot();
        displayStepForSubList();
        console.log(currentTask);
    } else if ((elementClassName == "circleDiv") || (elementClassName == "fa fa-check-circle")) {
        changedCheckedIntoUnchecked(id, "newSpanForSubTask", "none", "circleDiv")
        currentSubTask[0].checked = false;
        findCheckedOrNot();
        displayStepForSubList();
        console.log(currentTask);
    } else {
        for (var i = 0; i < existSubTasks.length; i++) {
            var findedSubTask = existSubTasks[i];
            if (findedSubTask[0].id == targetId) {
                currentSubTask = findedSubTask;
                document.getElementById("rightDiv").style.display = "block";
                findCheckedOrNot();
                displayStepForSubList();
            }
        }
        displayStepForSubList();
    } 
    });
}


document.getElementById("cicleSymbolForStep").addEventListener("click", function(event) {
var className = event.target.className;
console.log(className);
if (className == "fa fa-check-circle") {
    currentSubTask[0].checked = false;
    document.getElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
    document.getElementById("subTaskName").style.textDecoration = "none";
    var circleIcon = document.getElementById("cicleSymbolForStep");
    circleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
    displaySubTaskForList();
    
} else {
    currentSubTask[0].checked = true;
    document.getElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
    document.getElementById("subTaskName").style.textDecoration = "line-through";
    var circleIcon = document.getElementById("cicleSymbolForStep");
    circleIcon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    displaySubTaskForList();
}
});

function findCheckedOrNot() {
    if (currentSubTask[0].checked == false) {
        console.log(currentSubTask[0].checked);
        document.getElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
        document.getElementById("subTaskName").style.textDecoration = "none";
        var circleIcon = document.getElementById("cicleSymbolForStep");
        circleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
    } else {
        document.getElementById("subTaskName").textContent = currentSubTask[0].subTaskName; 
        document.getElementById("subTaskName").style.textDecoration = "line-through";
        var circleIcon = document.getElementById("cicleSymbolForStep");
        circleIcon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    }
}
        
        
function findCurrentSubTask(existSubTasks, id) {
    for (var i = 0; i < existSubTasks.length; i++) {
        var findedSubTask = existSubTasks[i];
        if (findedSubTask[0].id == id) {
            currentSubTask = findedSubTask;
        }
    }
}

function changedUncheckedIntoChecked(id, className, displayStyle, clasNameForCircleDiv) {
    console.log(id, className, displayStyle, clasNameForCircleDiv);
    getElementForTextDecoration(id, className, displayStyle);
    var icon =  document.getElementById(id).getElementsByClassName(clasNameForCircleDiv)[0];
    icon.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
}

function changedCheckedIntoUnchecked(id, className, displayStyle, clasNameForCircleDiv) {
    document.getElementById("subTaskName").style.textDecoration = "none";
    getElementForTextDecoration(id, className, displayStyle);
    var icon =  document.getElementById(id).getElementsByClassName(clasNameForCircleDiv)[0];
    icon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
}

function getElementForTextDecoration(id, classNameName, displayStyle) {
    document.getElementById(id).getElementsByClassName(classNameName)[0].style.textDecoration = displayStyle;
}

function setAttribute(elementName, setId, id) {
    elementName.setAttribute(setId, id);
}


function getAllElementInQuerySelector(element) {
    return document.querySelectorAll(element);
}

function hideOrShowNewList(taskName,displayStyle) {
    for (var i=0; i<=taskName.length; i++) {
        taskName[i].style.display = displayStyle;
    }
}

function getSelectedElementById(elementId) {
    return document.getElementById(elementId);
}
    

function openNav() {
    var element = getSelectedElementById("navigation");
    var taskName = getAllElementInQuerySelector("span");
    if (element.style.width == "300px") {
        document.getElementById("main").style.marginLeft= "0";
        element.style.width = "45px";
        showOrHideMenu("important_menu,day_menu,planned_menu,tasks_menu,userMenu,newListTextBox","none");
        hideOrShowNewList(taskName,"none");
    } else {
        openNavForNewList();
    }       
}

function openNavForNewList() {
    var taskName = getAllElementInQuerySelector("span"); 
    document.getElementById("main").style.marginLeft = "300px";
    var element = document.getElementById("navigation");
    element.style.width = "300px";
    showOrHideMenu("important_menu,day_menu,planned_menu,tasks_menu,userMenu,newListTextBox","block");
    hideOrShowNewList(taskName,"block");
}   

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

function showOrHideMenu() {
    var sideNavMenu = arguments[0].split(',');
    for (var i = 0; i < sideNavMenu.length; i++) {
        document.getElementById(sideNavMenu[i]).style.display = arguments[1];
    }
}












