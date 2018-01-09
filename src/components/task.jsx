import React, { Component } from 'react';

export default class Task extends Component {
    tempTitle = "";
    tempDescription = "";
    constructor(props) {
        super(props);
        this.state = {
            editMode: props.task.editMode,
            task: props.task
        }
        this.tempTitle = this.state.task.title;
        this.tempDescription = this.state.task.description;
        this.tempLabel = this.state.task.label;
        this.editClick = this.editClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }

    deleteClick(e) {
        this.props.deleteTask(this.props.task.id);
    }

    editClick(e) {
        this.setState({ editMode: true});
    }

    cancelClick(e) {
        if (this.tempLabel && !this.state.task.title && !this.state.task.description){
            this.props.deleteTask(this.props.task.id);
        }
        else if (this.tempTitle && this.tempDescription && this.tempLabel) {
            this.setState({ editMode: false});
        } else {
            this.props.deleteTask(this.props.task.id);
        }
    }

    saveClick = (e) => {
        this.props.saveClick(this.state.task.id, this.props.status, this.tempTitle, this.tempDescription, this.tempLabel);
    }

    setPriority = (e) => {
        this.tempLabel = e.target.value;
    }

    titleChanged(e) {
        this.tempTitle = e.target.value;
    }

    descriptionChanged(e) {
        this.tempDescription = e.target.value;
    }

    changeTaskStatus = (e) => {
        this.props.changeTaskStatus(e.target.getAttribute("value"), this.props.status, this.props.task.id);
    }

    render() {
        var buttons = "";
        switch (this.props.name) {
            case "To Do":
                buttons = <div className="buttons buttonsChange"><div className="button" value="inprocess" onClick={this.changeTaskStatus}>In Progress</div> <div className="button" value="done" onClick={this.changeTaskStatus}>Done</div></div>;
                break;
            case "In Progress":
                buttons = <div className="buttons buttonsChange"><div className="button" value="todo" onClick={this.changeTaskStatus}>To Do</div> <div className="button" value="done" onClick={this.changeTaskStatus}>Done</div></div>;
                break;
            case "Done":
                buttons = <div className="buttons buttonsChange"><div className="button" value="todo" onClick={this.changeTaskStatus}>To Do</div> <div className="button" value="inprocess" onClick={this.changeTaskStatus}>In Progress</div></div>;
                break;
            default:
                break;
        }

        var taskInfoComponent;
        var editButtonsComponent;

        var labelClass = "";
        if (this.state.task.label === "Low") {
            labelClass = "labelstat low";
        } else if (this.state.task.label === "Mid") {
            labelClass = "labelstat mid";
        } else {
            labelClass = "labelstat high";
        }

        var radioLables;
        if(this.tempLabel === "Low"){
            radioLables = (<div onChange={this.setPriority}>
                <input type="radio" name="priority" id="radioButton1" value="Low" defaultChecked/>
                <label htmlFor="radioButton1" ><div className="radio low">Low priority</div>
                </label>

                <input type="radio" name="priority" id="radioButton2" value="Mid" />
                <label htmlFor="radioButton2"><div className="radio mid">Mid priority</div>
                </label>

                <input type="radio" name="priority" id="radioButton3" value="High" />
                <label htmlFor="radioButton3"><div className="radio high">High priority</div>
                </label>
            </div>);
        } else if (this.tempLabel === "High") {
            radioLables = (<div onChange={this.setPriority}>
                <input type="radio" name="priority" id="radioButton1" value="Low"/>
                <label htmlFor="radioButton1" ><div className="radio low">Low priority</div>
                </label>

                <input type="radio" name="priority" id="radioButton2" value="Mid"/>
                <label htmlFor="radioButton2"><div className="radio mid">Mid priority</div>
                </label>

                <input type="radio" name="priority" id="radioButton3" value="High" defaultChecked/>
                <label htmlFor="radioButton3"><div className="radio high">High priority</div>
                </label>
            </div>);
        }
        else {
            radioLables = (<div onChange={this.setPriority}>
                <input type="radio" name="priority" id="radioButton1" value="Low"/>
                <label htmlFor="radioButton1" ><div className="radio low">Low priority</div>
                </label>

                <input type="radio" name="priority" id="radioButton2" value="Mid" defaultChecked/>
                <label htmlFor="radioButton2"><div className="radio mid">Mid priority</div>
                </label>

                <input type="radio" name="priority" id="radioButton3" value="High" />
                <label htmlFor="radioButton3"><div className="radio high">High priority</div>
                </label>
            </div>);
        }

        if (this.state.editMode) {
            taskInfoComponent = (<div>
                <div className="time">{this.state.task.time}</div>
                {radioLables}
                <input className="titleInput" type="text" placeholder="Title" defaultValue={this.tempTitle} onChange={this.titleChanged} />
                <br />
                <textarea className="descriptionInput" name="description" id="description" defaultValue={this.tempDescription} onChange={this.descriptionChanged}></textarea>
            </div>);

            editButtonsComponent = (<div className="buttons"><div className="button" onClick={this.saveClick}> Save </div>
                <div className="button" onClick={this.cancelClick}> Cancel</div><div className="button" onClick={this.deleteClick}>Delete</div></div>);
        } else {
            taskInfoComponent = <div><div className={labelClass}>{this.state.task.label} priority</div><div className="time">{this.state.task.time}</div><h3 className="title">{this.state.task.title}</h3><p className="description">{this.state.task.description}</p></div>;
            editButtonsComponent = <div className="buttons"><div className="button" onClick={this.editClick}>Edit</div><div className="button" onClick={this.deleteClick}>Delete</div></div>;
        }

        return (
            <div className="task">
                {taskInfoComponent}
                {buttons}
                {editButtonsComponent}
            </div>
        )
    }
}