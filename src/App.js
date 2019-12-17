import React, { Component } from 'react';
import './App.css';

let data = [
  {
    Name: 'test1', Email: 'test@gmail.com', Age: '1-1-1990',
    Experience: 1, Position: 'Engineer', Date: '1-1-2019', Status: 'approved'
  },
  {
    Name: 'test1', Email: 'test1@gmail.com', Age: '1-3-1990',
    Experience: 4, Position: 'Manager', Date: '1-3-2019', Status: 'waiting'
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
      updatedList: []
    }
  }
  componentDidMount() {
    this.filterByFields();
  }

  sortByOrder = () => {
    const queryParams = new URLSearchParams(this.props.location.search);
    const sortBy = queryParams.get('sortBy');
    const order = queryParams.get('order');
    this.setState(prevState => {
      const sortedArray = (order === 'a') ?
        [...prevState.updatedList].sort((data1,data2) => (data1[sortBy] > data2[sortBy]) ? 1 : -1 ) :
        [...prevState.updatedList].sort((data1,data2) => (data1[sortBy] < data2[sortBy]) ? 1 : -1 );
      return {updatedList: sortedArray};
    })
  }

  filterByFields = () => {
    const queryParams = new URLSearchParams(this.props.location.search);

    const filteredData = [...data].filter(curData => {
      return [...queryParams.entries()].reduce((acc, [key, value]) => {
        return acc && (key === 'sortBy' || key === 'order' || curData[key].includes(value));
      }, true);
    });

    this.setState({updatedList: filteredData});
    this.sortByOrder();
  }

  handleSort = async (sortBy, order) => {
    const queryParams = new URLSearchParams(this.props.location.search);
    queryParams.set('sortBy', sortBy);
    queryParams.set('order', order);
    await this.props.history.push(`/?${queryParams.toString()}`);
    this.sortByOrder();
  }

  handleOnChange = async (e) => {
    const queryParams = new URLSearchParams(this.props.location.search);
    queryParams.set(e.target.name, e.target.value);
    await this.props.history.push(`/?${queryParams.toString()}`);
    this.filterByFields();
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
          <span style={{'flexGrow': '2'}}>Name:<br/><input name="Name" onChange={this.handleOnChange} type="text" /></span>
          <span style={{'flexGrow': '2'}}>Status:<br/>
            <select name="Status" onChange={this.handleOnChange}>
              <option></option>
              <option value="approved">approved</option>
              <option value="waiting">waiting</option>
              <option value="reject">reject</option>
            </select>
          </span>
          <span style={{'flexGrow': '2'}}>Position:<br/><input name="Position" onChange={this.handleOnChange} type="text"/></span>
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
