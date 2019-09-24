document.getElementById("openbtn").addEventListener("click", openNav);
document.getElementById("plus").addEventListener("click", openNavForNewList);
//document.getElementById("rightDiv").style.display = "block";
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


var tasks = [];
var currentSubTask = [];
function addTask(newTasks) {
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
});
}

function displaySubTaskForList() {
    var listName = document.getElementById("text-content").textContent;
    var existList = tasks.find(function(element) { 
    return element.taskName == listName; 
    }); 
    var existSubTasks = existList.subTasks; 
    if (existSubTasks.length == 0) {
        document.getElementById("addSubTask").innerHTML = " ";
        return;
    } else { 
        document.getElementById("addSubTask").innerHTML = " ";
        for (var i = 0; i<= existSubTasks.length; i++) {
            var findedSubTask = existSubTasks[i];
            var newDiv = document.createElement("div"); 
            var newDivForCircleIcon = document.createElement("div");
            newDivForCircleIcon.classList.add("circleDiv");
            newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
            newDiv.classList.add("newTasks");
            var newLineBreakDiv = document.createElement("div");
            newLineBreakDiv.style.display="flex";
            newLineBreakDiv.classList.add("line");
            newDiv.style.display="flex";
            newDiv.classList.add("addSubTask");
            var currentDiv = document.getElementById("addSubTask"); 
            document.getElementById("addSubTask").style.width = "300px";
            document.getElementById("addSubTask").style.color = "#0078D7"; 
            var newSpan = document.createElement("p");
            newSpan.classList.add("newSpanForSubTask");
            newSpan.innerHTML = findedSubTask[0].subTaskName;
            newDiv.appendChild(newDivForCircleIcon);
            newDiv.appendChild(newLineBreakDiv);
            newDiv.appendChild(newSpan);
            currentDiv.appendChild(newDiv);
            document.getElementById("addSubTaskContent").value = " ";
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
        currentSubTask.step.push(createdStep);
        var newDiv = document.createElement("div"); 
        newDiv.setAttribute("id", id);
        var newDivForCircleIcon = document.createElement("div");
        newDivForCircleIcon.setAttribute("id", id);
        newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        newDiv.classList.add("newstep");
        var newLineBreakDiv = document.createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("line");
        var currentDiv = document.getElementById("addSteps"); 
        document.getElementById("addSteps").style.width = "300px";
        document.getElementById("addSteps").style.color = "#0078D7"; 
        var newSpan = document.createElement("p");
        newSpan.setAttribute("id", id); 
        newSpan.classList.add("newSpanForStep");
        newSpan.innerHTML = subTasks;
        newDiv.appendChild(newDivForCircleIcon);
        newDiv.appendChild(newLineBreakDiv);
        newDiv.appendChild(newSpan);
        currentDiv.appendChild(newDiv);
        document.getElementById("addStepContent").value = " ";
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
        newDivForCircleIcon.setAttribute("id", id);
        newDivForCircleIcon.classList.add("circleDiv");
        newDivForCircleIcon.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        newDiv.classList.add("newTasks");
        var newLineBreakDiv = document.createElement("div");
        newLineBreakDiv.style.display="flex";
        newLineBreakDiv.classList.add("line");
        newDiv.style.display="flex";
        newDiv.classList.add("addSubTask");
        var currentDiv = document.getElementById("addSubTask"); 
        document.getElementById("addSubTask").style.width = "300px";
        document.getElementById("addSubTask").style.color = "#0078D7"; 
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
      console.log(currentSubTask);
      var targetId = event.target.id;
      console.log(targetId);
      var currentTask = getActiveTask();
      console.log(currentTask);
      var existSubTasks = currentTask.subTasks;
      console.log(existSubTasks);
      console.log(id);
      console.log(targetId);
      for (var i = 0; i < existSubTasks.length; i++) {
        var findedSubTask = existSubTasks[i];
        if (findedSubTask[0].id == targetId) {
            currentSubTask = findedSubTask;
            document.getElementById("rightDiv").style.display = "block";
            document.getElementById("subTaskName").textContent = findedSubTask[0].subTaskName;
        }
    }
});
}



function openNav() {
    var element = document.getElementById("navigation");
    var newList = document.getElementById("newListTextBox").value;
    var list = document.getElementById("plus").text;
    var taskName = document.querySelectorAll("span"); 
    if (element.style.width == "300px") {
        document.getElementById("main").style.marginLeft= "0";
        element.style.width = "45px";
        document.getElementById("important_menu").style.display = "none";
        document.getElementById("day_menu").style.display = "none";
        document.getElementById("planned_menu").style.display = "none";
        document.getElementById("tasks_menu").style.display = "none";
        document.getElementById("newListTextBox").style.display = "none";
        document.getElementById("userMenu").style.display = "none";
        for (var i=0; i<=taskName.length; i++) {
            taskName[i].style.display = "none";
        }
    } else {
        element.style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
        document.getElementById("important_menu").style.display = "block";
        document.getElementById("day_menu").style.display = "block";
        document.getElementById("planned_menu").style.display = "block";
        document.getElementById("tasks_menu").style.display = "block";
        document.getElementById("newListTextBox").style.display = "block";
        document.getElementById("userMenu").style.display = "block";
         for (var i=0; i<=taskName.length; i++) {
            taskName[i].style.display = "block";
        }
    }       
}

function openNavForNewList() {
    var taskName = document.querySelectorAll("span"); 
    document.getElementById("main").style.marginLeft = "300px";
    var element = document.getElementById("navigation");
    element.style.width = "300px";
    document.getElementById("important_menu").style.display = "block";
    document.getElementById("day_menu").style.display = "block";
    document.getElementById("planned_menu").style.display = "block";
    document.getElementById("tasks_menu").style.display = "block";
    document.getElementById("newListTextBox").style.display = "block";
    document.getElementById("userMenu").style.display = "block";
     for (var i=0; i<=taskName.length; i++) {
            taskName[i].style.display = "block";
     }
}   












