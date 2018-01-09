import React, { Component } from 'react';
import Header from "./components/header";
import TaskColumn from "./components/taskscolumn";
import Timer from "./components/timer";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.initTasks()
    }
  }

  searchTasks = (text) => {
    var tasks = this.state.tasks;
    let status = Object.keys(this.state.tasks);
    for (let i = 0; i < status.length; i++) {
      let oneColumn = tasks[status[i]];
      for (let j = 0; j < oneColumn.length; j++) {
        if (oneColumn[j].title.toLowerCase().indexOf(text.toLowerCase()) === -1) {
          tasks[status[i]][j].hide = true;
        } else {
          tasks[status[i]][j].hide = false;
        }
      }
    }
    this.setState({
      tasks: tasks
    });
  }

  addOrRemoveFromLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  initTasks = () => {
    if (!localStorage.returnedUser) {
      let currentDate = new Date().toLocaleDateString();
      var defaultTasks = {
        todo: [{ "id": 67670, "editMode": false, "time": currentDate, "label": "High", "title": "Add new tasks", "description": "Click Add Task button below to add a new task" }],
        inprocess: [{ "id": 64419, "editMode": false, "time": currentDate, "label": "Mid", "title": "Edit existing tasks", "description": "Click Edit button to change Title, Description or lable of your task" }],
        done: [{ "id": 63189, "editMode": false, "time": currentDate, "label": "Low", "title": "Search for tasks", "description": "Type in something in the top of the page to search for tasks" }]
      };
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
      localStorage.setItem("returnedUser", true);
      return JSON.parse(localStorage.getItem('tasks'));
    } else {
      return JSON.parse(localStorage.getItem('tasks'));
    }
  }

  changeTaskStatus = (nextTaskStatus, previusTaskStatus, id) => {
    let tasks = this.state.tasks;
    let neededTask = {};
    for (let i = 0; i < tasks[previusTaskStatus].length; i++) {
      if (tasks[previusTaskStatus][i].id === id) {
        neededTask = tasks[previusTaskStatus][i];
        tasks[previusTaskStatus].splice(i, 1);
      }
    }

    tasks[nextTaskStatus].push(neededTask);

    this.setState({
      tasks: tasks
    });
    this.addOrRemoveFromLocalStorage();
  }

  addClick = (status) => {
    var inEditMode = false;
    let statuses = Object.keys(this.state.tasks);
    let tasks = this.state.tasks;

    for (let i = 0; i < statuses.length; i++) {
      var column = tasks[statuses[i]];
      for (let j = 0; j < column.length; j++) {
        if (column[j] && column[j].editMode) {
          column.pop();
        }
      }
    }

    if (!inEditMode) {
      var time = new Date().toLocaleDateString();
      let maxIdNumber = 99999;
      let newId = Math.floor(Math.random() * maxIdNumber);
      tasks[status].push({ "id": newId, "editMode": true, time: time, label: "Mid" });
      this.setState({ tasks: tasks });
    }

  }

  render() {
    //localStorage.removeItem("tasks");
    var status = Object.keys(this.state.tasks);
    return (
      <div>
        <Header searchTasks={this.searchTasks} />
        <div className="content">
          <h1><span className="fa fa-folder"></span>Main Board</h1>
          <Timer />
          <div className="row">
            <TaskColumn name="To Do" addOrRemoveFromLocalStorage={this.addOrRemoveFromLocalStorage} key={1} status={status[0]} statuses={status} changeTaskStatus={this.changeTaskStatus} addClick={this.addClick} tasks={this.state.tasks} />
            <TaskColumn name="In Progress" addOrRemoveFromLocalStorage={this.addOrRemoveFromLocalStorage} key={2} status={status[1]} statuses={status} changeTaskStatus={this.changeTaskStatus} addClick={this.addClick} tasks={this.state.tasks} />
            <TaskColumn name="Done" addOrRemoveFromLocalStorage={this.addOrRemoveFromLocalStorage} key={3} status={status[2]} statuses={status} changeTaskStatus={this.changeTaskStatus} addClick={this.addClick} tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
