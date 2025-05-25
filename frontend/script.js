document.getElementById("defaultOpen").click();
Vue.createApp({
  data() {
    return {
      tasks: [],
      title: "",
      description: "",
      due_date: null,
      status: "pending",
      fp: null,
      dialogVisible: false,
      completedTasks: [],
      activeAccordionIndex: null,
    };
  },
  mounted() {
    this.fetchAllTasks();
  },
  methods: {
    async fetchAllTasks() {
      try {
        const url = "http://localhost/Task-Managment/api/index.php/tasks";
        const response = await fetch(url);
        data = await response.json();
        // console.log(data);
        this.tasks = data.filter((task) => task.status !== "completed");
        this.completedTasks = data.filter(
          (task) => task.status === "completed"
        );
        // this.checkedTasks();
      } catch (e) {
        console.log(`Error fetching tasks data: ${e}`);
      }
    },
    addTask() {
      this.title;
      this.description;
      this.due_date;
      this.status;
      if (
        !this.title ||
        this.title.trim() === "" ||
        typeof this.title !== "string"
      ) {
        alert("Task must have a Title");
      }
      const newTitle = this.title;
      const newDescription = this.description
        ? this.description
        : "No description provided";
      const newStatus = this.status ? this.status : "pending";
      console.log(newDescription);
      const newTask = {
        title: newTitle,
        description: newDescription,
        due_date: this.due_date || null,
        status: newStatus,
      };
      this.saveTask(newTask);
      this.title = "";
      this.description = "";
      this.due_date = "";
      this.status = "pending";
    },

    async saveTask(task) {
      try {
        const url = "http://localhost/Task-Managment/api/index.php/tasks";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Failed to save task");
        // this.fetchAllTasks();

        const data = await response.json();
        console.log("Task saved:", data);
        if (data.success == true) {
          this.fetchAllTasks();
        }
      } catch (e) {
        console.log(`Error fetching tasks data: ${e}`);
      }
    },

    async checkTask(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.status = "completed";
      const statusTask = {
        status: task.status,
      };
      const url = `http://localhost/Task-Managment/api/index.php/tasks/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusTask),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const data = await response.json();

      if (!this.completedTasks.some((t) => t.id === id)) {
        this.completedTasks.push(task);
      }
      this.tasks = this.tasks.filter((t) => t.id !== id);
      console.log(data);
    },

    checkedTasks() {
      this.completedTasks = this.tasks.filter(
        (task) => task.status === "completed"
      );
    },

    deleteTask(id) {
      const url = `http://localhost/Task-Managment/api/index.php/tasks/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log("Task deleted:", data));
      this.completedTasks = this.completedTasks.filter(
        (task) => task.id !== id
      );
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    formatDateForInput(date) {
      const d = new Date(date);
      if (isNaN(d)) return "";
      return d.toISOString().split("T")[0];
    },

    toggleAccordion(index) {
      this.activeAccordionIndex =
        this.activeAccordionIndex === index ? null : index;
    },
    inputDate() {
      if (!this.fp) {
        this.$nextTick(() => {
          this.fp = flatpickr(this.$refs.flatpickrInput, {
            onChange: (selectedDates) => {
              console.log(selectedDates);
            },
            position: "below",
          });
          this.fp.open();
          console.log("Clicked!");
        });
      } else {
        this.fp.open();
        console.log("Already clicked");
      }
    },
  },
}).mount("#app");

function openlink(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablink;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    tablink[i].className = tablink[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Dialog functionality
document.addEventListener("DOMContentLoaded", function () {
  const taskDialog = document.getElementById("taskDialog");
  const overlay = document.getElementById("overlay");
  const addTaskButtons = document.querySelectorAll(
    ".add-task, .sidebar-item:first-child"
  );
  const cancelButton = document.getElementById("cancelTask");
  const confirmAddButton = document.getElementById("confirmAddTask");
  const taskInput = document.querySelector(".task-input");

  // Show dialog function
  function showDialog() {
    taskDialog.style.display = "block";
    overlay.style.display = "block";
    taskInput.focus();
  }

  // Hide dialog function
  function hideDialog() {
    taskDialog.style.display = "none";
    overlay.style.display = "none";
    taskInput.value = "";
  }

  // Add event listeners to show dialog
  addTaskButtons.forEach((button) => {
    button.addEventListener("click", showDialog);
  });

  // Add event listener to cancel button
  cancelButton.addEventListener("click", hideDialog);

  // Add event listener to overlay for closing dialog when clicking outside
  overlay.addEventListener("click", hideDialog);

  // Add event listener to confirm button
  confirmAddButton.addEventListener("click", () => {
    const taskTitle = taskInput.value.trim();
    hideDialog();
    if (taskTitle) {
      // If using Vue, you would add to the tasks array here
      // For now, we'll just create a new task element manually
      // const taskList = document.querySelector(".task-list");
      // const emptyContent = document.querySelector(".empty-content");
      // if (emptyContent && taskList) {
      //   // Hide the empty content message if it's visible
      //   emptyContent.style.display = "none";
      // }
      // if (taskList) {
      //   const newTask = document.createElement("li");
      //   newTask.className = "task-item";
      //   newTask.innerHTML = `
      //     <div class="task-checkbox"></div>
      //     <div class="task-text">${taskTitle}</div>
      //   `;
      //   taskList.appendChild(newTask);
      // }
    } else {
      // Add some visual feedback that a task title is required
      taskInput.style.borderColor = "#ff3b30";
      setTimeout(() => {
        taskInput.style.borderColor = "#00b8d4";
      }, 1000);
    }
  });

  let isDialog = false;

  document.addEventListener("keydown", function (event) {
    // Check if only the Alt key is pressed
    if (event.key === "Alt") {
      if (!isDialog) {
        console.log("Alt key pressed - Showing dialog");
        showDialog();
      } else {
        console.log("Alt key pressed - Hiding dialog");
        hideDialog();
      }
      isDialog = !isDialog; // Toggle the state
      event.preventDefault(); // Prevent default behavior (optional)
    }
  });
});

// Vue.createApp({
//   data() {
//     return {
//       tasks: [],
//       title: "",
//       description: "",
//       due_date: null,
//       status: "pending",
//       fp: null,
//       dialogVisible: false,
//       currentTab: "inbox", // Track current tab
//     };
//   },
//   mounted() {
//     this.fetchAllTasks();
//     this.currentTab = "inbox"; // Set default tab
//     this.$nextTick(() => {
//       this.inputDate();
//     });

//     document.addEventListener("keydown", this.altKeyToggleDialog);
//   },
//   beforeUnmount() {
//     document.removeEventListener("keydown", this.altKeyToggleDialog);
//   },
//   methods: {
//     async fetchAllTasks() {
//       try {
//         const url = "http://localhost/Task-Managment/api/index.php/tasks";
//         const response = await fetch(url);
//         const data = await response.json();
//         this.tasks = data;
//       } catch (e) {
//         console.error(`Error fetching tasks data: ${e}`);
//       }
//     },
//     addTask() {
//       if (!this.title || this.title.trim() === "") {
//         alert("Task must have a Title");
//         return;
//       }

//       const newTask = {
//         title: this.title.trim(),
//         description: this.description || "No description provided",
//         due_date: this.due_date || null,
//         status: this.status || "pending",
//       };

//       this.saveTask(newTask);
//       this.title = "";
//       this.description = "";
//       this.due_date = null;
//       this.status = "pending";
//       this.dialogVisible = false;
//     },
//     async saveTask(task) {
//       try {
//         const url = "http://localhost/Task-Managment/api/index.php/tasks";
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(task),
//         });

//         const data = await response.json();
//         this.fetchAllTasks();
//       } catch (e) {
//         console.error(`Error saving task: ${e}`);
//       }
//     },
//     checkTask(id) {
//       const task = this.tasks.find((t) => t.id === id);
//       if (task) {
//         task.status = "completed";
//       }
//     },
//     inputDate() {
//       this.fp = flatpickr(this.$refs.flatpickrInput, {
//         onChange: (selectedDates) => {
//           console.log(selectedDates);
//         },
//         position: "below",
//       });
//     },
//     showDialog() {
//       this.dialogVisible = true;
//     },
//     hideDialog() {
//       this.dialogVisible = false;
//       this.title = "";
//     },
//     altKeyToggleDialog(e) {
//       if (e.key === "Alt") {
//         this.dialogVisible = !this.dialogVisible;
//         e.preventDefault();
//       }
//     },
//     switchTab(tabName) {
//       this.currentTab = tabName;
//     },
//   },
// }).mount("#app");
