import React from "react";
import Countdown from "./countdown";


class Stopwatch extends React.Component{
    constructor(){
        super();
        this.state={
            isWatch:false,
            isCount:false,
        }
    }
    showWatch = () => {
        this.setState({isWatch: !this.state.isWatch});
    }
    showCount = () => {
        this.setState({isCount: !this.state.isCount})
    }
    closeWatch = () => {
        this.setState({isWatch:!this.state.isWatch});
    }
    closeCount = () => {
        this.setState({isCount: !this.state.isCount})
    }
    render(){
        return(
            <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <div className="me-5">
                    {this.state.isWatch ? <StopwatchTimer closeWatch={this.closeWatch} /> : <ButtonStopWatch showWatch={this.showWatch} />}
                </div>
                <div className="ms-5">
                    {this.state.isCount ? <Countdown closeCount={this.closeCount} /> : <ButtonCountdown showCount={this.showCount} />}
                </div>
            </div>
        )
    }
}

function ButtonStopWatch(props){
    return(
        <button className="btn btn-primary" onClick={props.showWatch}>Stopwatch</button>
    )
}

function ButtonCountdown(props){
    return(
        <button className="btn btn-primary" onClick={props.showCount}>Countdown</button>
    )
}

class StopwatchTimer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timer:null,
            minutes:'00',
            miliseconds:'00',
            hours:'00',
            startDisabled: false,
            stopDisabled: false
        }
    }
    componentDidMount() {
        this.start();
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.minutes;

            if( Number(this.state.miliseconds) === 99 ) {
                count = (Number(this.state.minutes) + 1).toString();
                num = '00';
            }
            var hours = this.state.hours;
            if(Number(this.state.minutes) === 99) {
                hours = (Number(this.state.hours) + 1).toString();
                count = '00';
            }
            self.setState({
                hours: hours.length === 1 ? '0'+hours : hours,
                minutes: count.length === 1 ? '0'+count : count,
                miliseconds: num.length === 1 ? '0'+num : num
            });
        }, 0);
        this.setState({timer});
    }
    isStart = () => {
        this.start();
        this.setState({startDisabled: true, stopDisabled: false});
    }
    onStop = () => {
        clearInterval(this.state.timer);
        this.setState({startDisabled: false, stopDisabled: true});
    }
    render(){
        let minutes = this.state.minutes;
        let miliseconds = this.state.miliseconds;
        let hours = this.state.hours;
        return(
            <div>
                <div className="card" style={{width:"300px" , height:"250px"}}>
                    <div className="card-body text-center bg-dark">
                        <h5 className="position-absolute top-0 start-100 translate-middle" onClick={this.props.closeWatch} >X</h5>
                        <h1>Stopwatch</h1>
                        <h1 className="mb-5">{ this.state.startDisabled ? `${hours}: ${minutes}: ${miliseconds}` : "00:00:00" }</h1>
                        <div className="mt-5">
                            { this.state.startDisabled ? <button className="btn btn-danger me-2" onClick={this.onStop}>Stop</button>: <button className="btn btn-success" onClick={this.isStart}>Start</button> }  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Stopwatch;