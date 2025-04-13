function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
  
    if (taskText === "") return;
  
    const taskList = document.getElementById("taskList");
  
    if (!document.getElementById("dateHeading")) {
      const now = new Date();
      const dateString = now.toLocaleDateString();
  
      const dateHeading = document.createElement("h3");
      dateHeading.textContent = `Tasks for ${dateString}`;
      dateHeading.id = "dateHeading";
      taskList.appendChild(dateHeading);
    }
  
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button onclick="removeTask(this)">❌</button>
    `;
  
    li.onclick = function () {
      li.classList.toggle("done");
    };
  
    taskList.appendChild(li);
    input.value = "";
  
    storeTask(taskText);
  }
  
  function removeTask(btn) {
    btn.parentElement.remove();
  }
  
  function storeTask(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date().toLocaleDateString();
    tasks.push({ text, date: today });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  