function getFormattedDate(offset = 0) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toLocaleDateString();
  }
  
  function getLast7Dates() {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(getFormattedDate(i));
    }
    return dates;
  }
  
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const last7Dates = getLast7Dates();
  const groupedTasks = {};
  
  // Initialize grouped object
  last7Dates.forEach(date => {
    groupedTasks[date] = [];
  });
  
  // Group tasks
  tasks.forEach(task => {
    if (groupedTasks[task.date]) {
      groupedTasks[task.date].push(task.text);
    }
  });
  
  const historyList = document.getElementById("historyList");
  const dateFilter = document.getElementById("dateFilter");
  
  // Add "All (Whole Week)" option
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "🗓️ All (Whole Week)";
  dateFilter.appendChild(allOption);
  
  // Add individual dates
  last7Dates.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = `Tasks for ${date}`;
    dateFilter.appendChild(option);
  });
  
  // Function to display tasks for one day
  function displayOneDay(date) {
    const tasksForDate = groupedTasks[date];
    const title = document.createElement("h3");
    title.textContent = tasksForDate.length > 0
      ? `Tasks for ${date}`
      : `No tasks for ${date}`;
    historyList.appendChild(title);
  
    if (tasksForDate.length > 0) {
      const ul = document.createElement("ul");
      tasksForDate.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        ul.appendChild(li);
      });
      historyList.appendChild(ul);
    }
  }
  
  // Master display function
  function displayTasks(date) {
    historyList.innerHTML = "";
  
    if (date === "all") {
      last7Dates.forEach(d => displayOneDay(d));
    } else {
      displayOneDay(date);
    }
  }
  
  // Default view: Today
  displayTasks(last7Dates[0]);
  
  // Change view on dropdown select
  dateFilter.addEventListener("change", function () {
    displayTasks(this.value);
  });
  