import React, { Component } from 'react';
import './App.css';
import Sort from './Sort';
import Filters from './Filters';


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
    return (
      <div className="App">
        <Filters filterByFields={this.filterByFields} location={this.props.location} history={this.props.history} />
        <table>
          <tbody>
            <tr>
              <th>Name</th><th>Email</th><th>Age</th>
              <Sort sortByOrder={this.sortByOrder} location={this.props.location} history={this.props.history}/>
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
