import React, { Component } from 'react';
import './App.css';

let data = [
  {
    Name: 'test', Email: 'test@gmail.com', Age: '1-1-1990',
    Experience: 1, Position: 'Engineer', Date: '1-1-2019', Status: 'approved'
  },
  {
    Name: 'test1', Email: 'test1@gmail.com', Age: '1-3-1990',
    Experience: 4, Position: 'Manager', Date: '1-3-2019', Status: 'approved'
  },
  {
    Name: 'test2', Email: 'test2@gmail.com', Age: '1-2-1990',
    Experience: 2, Position: 'Accountant', Date: '1-2-2019', Status: 'approved'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedList: [],
      sort: {
        experience: null,
        position: null,
        date: null
      }
    }
  }
  componentDidMount() {
    this.setState({updatedList: data});
  }

  handleSort = (sortBy, order) => {
    let sortedArray = [];
    if (order === 'a') {
      sortedArray = this.state.updatedList.sort((data1,data2) => (data1[sortBy] > data2[sortBy]) ? 1 : -1 );
    } else {
      sortedArray = this.state.updatedList.sort((data1,data2) => (data1[sortBy] < data2[sortBy]) ? 1 : -1 );
    }
    this.setState({updatedList: sortedArray});
  }
  render() {
    let displayList = this.state.updatedList.map(data => {
      return (
        <tr key={data.Email}>
          <td>{data.Name}</td><td>{data.Email}</td><td>{data.Age}</td>
          <td>{data.Experience}</td>
          <td>{data.Position}</td>
          <td>{data.Date}</td>
          <td>{data.Status}</td>
        </tr>
      );
   });
   let sortHeaders = ['Experience', 'Position', 'Date'].map(header => {
     return (
       <th key={header}>
         <svg onClick={e => this.handleSort(header, 'd')} className="arrow" x="0px" y="0px" viewBox="0 0 386.257 386.257">
           <polygon points="0,96.879 193.129,289.379 386.257,96.879 "></polygon>
         </svg>
         {header}
         <svg onClick={e => this.handleSort(header, 'a')} className="arrow up" x="0px" y="0px" viewBox="0 0 386.257 386.257">
           <polygon points="0,96.879 193.129,289.379 386.257,96.879 "></polygon>
         </svg>
       </th>
     );
   });
    return (
      <div className="App">
        <div style={{'display': 'flex', 'marginBottom': '15px',}}>
          <span style={{'flexGrow': '1'}}>Filter By:</span>
          <span style={{'flexGrow': '2'}}>Name:<br/><input onChange={this.handleOnChange} type="text"/></span>
          <span style={{'flexGrow': '2'}}>Status:<br/>
            <select name="status">
              <option value="all">all</option>
              <option value="approved">approved</option>
              <option value="waiting">waiting</option>
              <option value="reject">reject</option>
            </select>
          </span>
          <span style={{'flexGrow': '2'}}>Position:<br/><input type="text"/></span>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Name</th><th>Email</th><th>Age</th>
              {sortHeaders}
              <th>Status</th>
            </tr>
            {displayList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
