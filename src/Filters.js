import React, { Component } from 'react';
import './Filters.css';

class Filters extends Component {

  handleOnChange = async (e) => {
    const queryParams = new URLSearchParams(this.props.location.search);
    queryParams.set(e.target.name, e.target.value);
    await this.props.history.push(`/?${queryParams.toString()}`);
    this.props.filterByFields();
  }

  render() {
    return (
      <div className="filters">
        <span className="flex-1">Filter By:</span>
        <span className="flex-2">Name:<br/><input name="Name" onChange={this.handleOnChange} type="text" /></span>
        <span className="flex-2">Status:<br/>
          <select name="Status" onChange={this.handleOnChange}>
            <option></option>
            <option value="approved">approved</option>
            <option value="waiting">waiting</option>
            <option value="reject">reject</option>
          </select>
        </span>
        <span className="flex-2">Position:<br/><input name="Position" onChange={this.handleOnChange} type="text"/></span>
      </div>
    );
  }
}

export default Filters;
