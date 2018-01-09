import React, { Component } from 'react';
import Task from "./task";

export default class TaskColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        }
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask(taskId) {
        let index = -1;
        let tasks = this.state.tasks;
        var status = this.props.status;
        for (let i = 0; i < tasks[status].length; i++) {
            if (taskId === tasks[status][i].id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tasks[status].splice(index, 1);
            this.setState({ tasks: tasks });
        }
        this.props.addOrRemoveFromLocalStorage();
    }

    saveClick = (taskId, columnName, tempTitle, tempDescription, tempLabel) => {
        if (tempTitle && tempDescription && tempLabel) {
            var tasks = this.state.tasks;
            var taskIndex;
            var status = this.props.status;
            var column = tasks[status];
            for(let i = 0; i<column.length; i++){
                if(column[i].id === taskId)
                taskIndex = i;
            }
            tasks[columnName][taskIndex]["title"] = tempTitle;
            tasks[columnName][taskIndex]["description"] = tempDescription;
            tasks[columnName][taskIndex]["label"] = tempLabel;
            tasks[columnName][taskIndex]["editMode"] = false;

            this.setState({ tasks: tasks});
        }
        this.props.addOrRemoveFromLocalStorage();
    }

    addClick = (e) => {
        this.props.addClick(this.props.status);
    }

    maxTaskId(){
        return Math.floor(Math.random()*10000);
    }
    
    render() {
        //Pushing relative tasks for the column
        var tasks = this.state.tasks;
        var taskElement = [];
        var name = this.props.name;
        var status = this.props.status;     
        for (var i = 0; i < tasks[status].length; i++) {
            let task = tasks[status][i];
            if(!task.hide){
                taskElement.push(<Task name={name} saveClick={this.saveClick} addOrRemoveFromLocalStorage={this.props.addOrRemoveFromLocalStorage} status={this.props.status} key={this.maxTaskId()} changeTaskStatus={this.props.changeTaskStatus} task={task} deleteTask={this.deleteTask} />);
            }
        }
        //Decorative Lines
        var decorativeLine = "";
        if (name === "To Do") {
            decorativeLine = "decorative-line-1";
        } else if (name === "In Progress") {
            decorativeLine = "decorative-line-2";
        } else {
            decorativeLine = "decorative-line-3";
        }

        return (
            <div className="col-md-4">
                <div className="column">
                    <div className={decorativeLine}></div>
                    <h2 className="title">{name}</h2>
                    <div className="tasks">
                        {taskElement}
                    </div>
                    <div className="addbutton" onClick={this.addClick}>
                        Add Task <i className="fa fa-plus-circle"></i>
                    </div>
                </div>
            </div>
        );
    }
}