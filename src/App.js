import React, { Component } from 'react';
import './App.css';
import down from './down-arrow.svg';

let data = [
  {
    name: 'test', email: 'test@gmail.com', age: '1-1-1990',
    experience: 1, position: 'Engineer', date: '1-1-2019', status: 'approved'
  },
  {
    name: 'test1', email: 'test1@gmail.com', age: '1-3-1990',
    experience: 4, position: 'Manager', date: '1-3-2019', status: 'approved'
  },
  {
    name: 'test2', email: 'test2@gmail.com', age: '1-2-1990',
    experience: 2, position: 'Accountant', date: '1-2-2019', status: 'approved'
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

  handleSort = sortBy => {
    let sortedArray = this.state.updatedList.sort((data1,data2) => (data1[sortBy] > data2[sortBy]) ? 1 : -1 );
    this.setState({updatedList: sortedArray});
  }
  render() {
    let displayList = this.state.updatedList.map(data => {
      return (
        <tr key={data.email}>
          <td>{data.name}</td><td>{data.email}</td><td>{data.age}</td>
          <td>{data.experience}</td>
          <td>{data.position}</td>
          <td>{data.date}</td>
          <td>{data.status}</td>
        </tr>
      );
   });
    return (
      <div className="App">
        <table>
          <tr>
            <th>Name</th><th>Email</th><th>Age</th>
            <th onClick={e => this.handleSort('experience')}>
              {down}
              Experience
            </th>
            <th onClick={e => this.handleSort('position')}>Position</th>
            <th onClick={e => this.handleSort('date')}>Date</th>
            <th>Status</th>
          </tr>
          {displayList}
        </table>
      </div>
    );
  }
}

export default App;
