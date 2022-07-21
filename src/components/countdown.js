import React from "react";


class Countdown extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isStarted: false,
        isStopped: false,
        time: 0,
      };
      this.timer = null;
      this.timeout = null;
    }
  
    handleStart = () => {
      this.setState({ isStarted: !this.state.isStarted });
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time - 1 });
      }, 1000);
  
      this.timeout = setTimeout(() => {
        alert('time out');
        clearInterval(this.timer);
        this.setState({ time: 0, isStarted: false, isStopped: false });
      }, this.state.time * 1000);
    };
  
    handleStop = () => {
      this.setState({ isStopped: !this.state.isStopped });
      clearInterval(this.timer);
      clearTimeout(this.timeout);
    };
  
    handleReset = () => {
      this.setState({ isStarted: false, isStopped: false, time: 0 });
      clearInterval(this.timer);
    };
  
    handleResume = () => {
      this.setState({ isStopped: !this.state.isStopped });
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time - 1 });
      }, 1000);
  
      this.timeout = setTimeout(() => {
        alert('time out');
        clearInterval(this.timer);
        this.setState({ time: 0, isStarted: false, isStopped: false });
      }, this.state.time * 1000);
    };
  
    handleIncrement = (value) => {
      // eslint-disable-next-line default-case
      switch (value) {
        case 'hours':
          return this.setState({ time: this.state.time + 3600 });
        case 'minutes':
          return this.setState({ time: this.state.time + 60 });
        case 'seconds':
          return this.setState({ time: this.state.time + 1 });
      }
    };
  
    handleDecrement = (value) => {
        // eslint-disable-next-line default-case
      switch (value) {
        case 'hours':
          return this.setState({
            time:
              this.state.time - 3600 < 0
                ? this.state.time - 0
                : this.state.time - 3600,
          });
        case 'minutes':
          return this.setState({
            time:
              this.state.time - 60 < 0
                ? this.state.time - 0
                : this.state.time - 60,
          });
        case 'seconds':
          return this.setState({
            time:
              this.state.time - 1 < 0 ? this.state.time - 0 : this.state.time - 1,
          });
      }
    };
  
    render() {
      return (
        <div className=' card text-center text-light bg-dark' style={{width:"300px"}}>
          <span
            onClick={() => {
              this.handleReset();
              this.props.closeCount();
            }}
            className='cross'
          >
            X
          </span>
          <h2 className='countdown-header'>Countdown</h2>
          <h5 className='text-light'>Hours : Minutes : Seconds</h5>
          <div className='countdown-display'>
            <button
              onClick={() => this.handleIncrement('hours')}
              className='btn btn-secondary'
            >
              ⬆
            </button>
            <button
              onClick={() => this.handleIncrement('minutes')}
              className='btn btn-secondary'
            >
              ⬆
            </button>
            <button
              onClick={() => this.handleIncrement('seconds')}
              className='btn btn-secondary'
            >
              ⬆
            </button>
            <h2 className='countdown-time'>
              <span className='hours'>
                {this.state.time > 0
                  ? '0' + Math.floor((this.state.time / 3600) % 60) + ' : '
                  : ' 00 :'}
              </span>
              <span className='minutes'>
                {this.state.time > 0
                  ? '0' + Math.floor((this.state.time / 60) % 60) + ' : '
                  : ' 00 :'}
              </span>
              <span className='seconds'>
                {this.state.time > 0 ? Math.floor(this.state.time % 60) : ' 00'}
              </span>
            </h2>
            <button
              onClick={() => this.handleDecrement('hours')}
              className='btn btn-secondary'
            >
              ⬇
            </button>
            <button
              onClick={() => this.handleDecrement('minutes')}
              className='btn btn-secondary'
            >
              ⬇
            </button>
            <button
              onClick={() => this.handleDecrement('seconds')}
              className='btn btn-secondary'
            >
              ⬇
            </button>
          </div>
          {!this.state.isStarted ? (
            <button onClick={this.handleStart} className='btn btn-secondary'>
              Start
            </button>
          ) : !this.state.isStopped ? (
            <button onClick={this.handleStop} className='btn btn-secondary'>
              Stop
            </button>
          ) : (
            <div>
              <button onClick={this.handleResume} className='btn btn-secondary'>
                Resume
              </button>
              <button onClick={this.handleReset} className='btn btn-secondary'>
                Reset
              </button>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default Countdown;