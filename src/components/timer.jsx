import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: this.getCurrentDate()
        }
    }

    searchTasks = (e) => {
        let text = e.target.value;
        this.props.searchTasks(text);
    }
    getCurrentDate() {
        return new Date().toLocaleString();
    }

    componentDidMount() {
        const oneSec = 1000;
        setInterval(() => { this.setState({ currentDate: this.getCurrentDate() }) }, oneSec);
    }
    render() {
        let date = new Date();
        let day = date.getDay();
        let Day;
        switch (day) {
            case 0:
                Day = "Sunday";
                break;
            case 1:
                Day = "Monday";
                break;
            case 2:
                Day = "Tuesday";
                break;
            case 3:
                Day = "Wednesday";
                break;
            case 4:
                Day = "Thirsday";
                break;
            case 5:
                Day = "Friday";
                break;
            case 6:
                Day = "Saturday";
                break;
            default:
                break;
        }

        return (
            <p className="date">Today: <strong id="date">{Day} {this.state.currentDate}</strong></p>
        );
    }
}


