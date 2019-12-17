import React, { Component } from 'react';

class Sort extends Component {

  handleSort = async (sortBy, order) => {
    const queryParams = new URLSearchParams(this.props.location.search);
    queryParams.set('sortBy', sortBy);
    queryParams.set('order', order);
    await this.props.history.push(`/?${queryParams.toString()}`);
    this.props.sortByOrder();
  }

  render() {
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
      <React.Fragment>
        {sortHeaders}
      </React.Fragment>
    );
  }
}

export default Sort;
