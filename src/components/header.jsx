import React, { Component } from 'react';

export default class Header extends Component {
    searchTasks = (e) => {
        let text = e.target.value;
        this.props.searchTasks(text);
    }

    render() {
        return (
            <header>
                <div className="logo">Tasker</div>
                <div className="serchInput"><i className="fa fa-search"></i><input type="text" placeholder="Search for tasks..." onChange={this.searchTasks} /></div>
                <div className="settingsIcon">
                    <i className="fa fa-cog"></i>
                </div>
            </header>
        );
    }
}

//export default Header;