let theInput = document.querySelector('.add-task input'),
    addBtn = document.querySelector('.add-task .plus'),
    tasksContainer = document.querySelector('.tasks-content'),
    
    
    tasksCount = document.querySelector('.tasks-count span'),
    tasksCompleted = document.querySelector('.tasks-completed span'),
    deleteAllBtn = document.getElementById("delete-all"),
    finishAllBtn = document.getElementById("finish-all");

window.onload = function() {
    theInput.focus();
}

function addNewTask() {
    let mainSpan = document.createElement('span');
    let myPara = document.createElement('span');
    let deleteElement = document.createElement("span");
    let text = document.createTextNode(theInput.value);
    let deleteText = document.createTextNode("Delete");
    
    myPara.appendChild(text)
    myPara.className = "para"
    mainSpan.appendChild(myPara);
    mainSpan.className = "task-box";

    deleteElement.appendChild(deleteText);
    deleteElement.className = "delete";

    mainSpan.appendChild(deleteElement);
    tasksContainer.appendChild(mainSpan);
    // console.log(tasksContent);

    theInput.value = "";
    theInput.focus();
    
    calculateTasks();
}

addBtn.onclick = function() {
    if(theInput.value === "" || null){
        Swal.fire('Please, Fill the Tasks Input!') //check if the input is empty
    }else{
        // checkIsExist();
        noTasksMsg = document.querySelector('.no-tasks-message');
        if (document.body.contains(document.querySelector('.no-tasks-message'))) {
            noTasksMsg.remove();
        }

        let tasksList = document.querySelectorAll('.task-box .para');//check if task is exist
        myArr = [...Array.from(tasksList)];
        for (var i = 0; i < myArr.length; i++){
            if (theInput.value == myArr[i].innerHTML) {
                return Swal.fire('This Task is Added before, please check againe !!')
            }
        }
        addNewTask();
        
    }
}

document.addEventListener("click", function(e){
    if (e.target.className == "delete") {
        e.target.parentNode.remove();
        if(tasksContainer.childElementCount == 0){
            createNoTasks();
        }
    }
    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finished")
    }
    calculateTasks();
    // checkIsExist();
})

function createNoTasks(){
    let msgSpan = document.createElement('span'),
        msgSpanText = document.createTextNode("No Tasks To Show");
        msgSpan.appendChild(msgSpanText);
        msgSpan.className = "no-tasks-message";
        tasksContainer.appendChild(msgSpan);
}
function calculateTasks() {
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
    
}

finishAllBtn.onclick = function(){
    let tasksContent = document.querySelectorAll('.task-box .para');//check if task is exist
    myArr = [...Array.from(tasksContent)];
    myArr.forEach(ele => {
        ele.classList.toggle("finished");
    });
    calculateTasks()
}
deleteAllBtn.onclick = function(){
    let tasksContent = document.querySelectorAll('.task-box .para');//check if task is exist
    myArr = [...Array.from(tasksContent)];
    myArr.forEach(ele => {
        ele.parentNode.remove();
        
    });
    createNoTasks();
}
