import React from 'react';
import {
    BarChart,
    XAxis,
    CartesianGrid,
    Bar,
    Tooltip,
    Cell
  } from "recharts";

import {twitterData} from "./twitter_data"
import "./table2.css";

class TwitterBarChart extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            data : twitterData,
            account:props.account,
            followers:props.followers,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }
    componentWillReceiveProps(newProps) {
      this.setState({account: newProps.account,followers: newProps.followers});
    }
    
  
    render() {
    const { activeIndex, data } = this.state;
      return(
          <>
        <BarChart
          width={250}
          height={150}
          data={twitterData}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="account" tick={false}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip/>
          <Bar dataKey="followers" fill="#8884d8" background={{ fill: "#eee" }} onMouseOver={this.handleClick} >
          {
                data.map((entry, index) => (
                  <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                ))
            }
          </Bar>
          
        </BarChart>
            <div className="barchart-msg-container">
                <p className="barchart-message"><strong>{this.state.account}</strong> has <span style={{color:"rgb(255, 138, 116)",fontWeight:"bold"}}>{this.state.followers}</span> followers on Twitter</p>
            </div> 
        </>
      )
    }
  }

export default TwitterBarChart;