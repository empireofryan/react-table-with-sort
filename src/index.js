import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Row = ({id, symbol, todaysReturn, afterHours, complete}) => (
  <div className="row">
    <div>{id}</div>
    <div>{symbol}</div>
    <div>{todaysReturn}</div>
    <div>{afterHours}</div>    
    <div>{complete}</div>    
  </div>
);
  
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 403, symbol: 'CRON', todaysReturn: '1.9%', afterHours: '2.4%', complete: 100}, 
        {id: 532, symbol: 'NFLX', todaysReturn: '3.9%', afterHours: '-1.2%', complete: 30},
      ],
    };
    
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }
  
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
  
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    console.log('arrayCopy', arrayCopy)
    console.log('key', key)
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy.reverse()});
  }
  
  render() {
    const rows = this.state.data.map( (rowData) => <Row {...rowData} />);
  
    return (
      <div className="table">
        <div className="header">
          <div onClick={() => this.sortBy('id')} >ID</div>
          <div onClick={() => this.sortBy('symbol')}>Symbol</div>
          <div onClick={() => this.sortBy('todaysReturn')}>todaysReturn</div>
          <div onClick={() => this.sortBy('afterHours')}>Issue afterHours</div>
          <div onClick={() => this.sortBy('complete')}>% Complete</div>
        </div>
        <div className="body">
          {rows}
        </div>
      </div>
    );
    
  }
}
  
ReactDOM.render(<Table />, document.getElementById('app'));
registerServiceWorker();