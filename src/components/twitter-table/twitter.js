import React from 'react'
import {twitterData} from './twitter_data'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./table2.css"

import TwitterBarChart from './twitterChart';


class Twitter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:twitterData,
      twitter_account:'BernieSanders',
      twitter_followers:9254423,
    }
    this.onRowMouseOver = this.onRowMouseOver.bind(this);
  }
  
  onRowMouseOver(row){
      this.setState({twitter_account:row.account,twitter_followers:row.followers});
  }
  
 
  render() {
  
  const CellFormatter = (cell, row) => {
    return (<div className="followers-tbl"><a href={"https://twitter.com/"+cell}>@{cell}</a></div>);
  }
  
  function getWidth(temp){
    return ( temp*100/maxC);
  }
  var maxC = Math.max(...this.state.data.map(o=>o.followers));
   
  const FollowerCellFormatter = (cell, row) => {
    return (
      <div>
        <div className="bar-cell">
            <span className="number">{cell}</span>
            <div className="bar-chart">
              <div className="bar" style={{width: getWidth(cell)+"%"}}></div>
            </div>
        </div>
      </div>);
  }

  function getExclusiveWidth(tem){
    return (tem*100).toFixed(2);
  }
 
  const ExclusiveFollowerCellFormatter = (cell, row) => {
    return (
      <div>
        <div className="bar-cell">
            <span className="number">{getExclusiveWidth(cell)}%</span>
            <div className="bar-chart" style={{backgroundColor: "#e1e1e1"}}>
              <div className="Ex-bar" style={{width: getExclusiveWidth(cell)+"%"}}></div>
            </div>
        </div>
      </div>
      );
  }
 

  const options = {
    onRowMouseOver: this.onRowMouseOver,
  };

  return (
    <div>
    <div className="twitter-followers">
    <div className="followers-header">
        <BootstrapTable data={this.state.data} options={options}>
            <TableHeaderColumn dataField='account' dataFormat={CellFormatter} isKey={true} dataSort={ true } dataAlign='left' width='120' headerAlign='left' className="header">ACCOUNT</TableHeaderColumn>
            <TableHeaderColumn dataField='followers'dataFormat={FollowerCellFormatter} dataSort={ true } width='120' dataAlign='center'  headerAlign='left' className="header">FOLLOWERS</TableHeaderColumn>
            <TableHeaderColumn dataField='exclusive_followers_pct' dataFormat={ExclusiveFollowerCellFormatter} dataSort={ true }  width='120' headerAlign='left' className="header">EXCLUSIVE FOLLOWERS</TableHeaderColumn>
        </BootstrapTable>
    </div>
    </div>
 
    <TwitterBarChart account={this.state.twitter_account} followers={this.state.twitter_followers}/>
  
    </div>
  )
  }
}


export default Twitter;