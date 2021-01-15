import React from 'react';
import {
    BarChart,
    XAxis,
    CartesianGrid,
    Bar,
    Cell,
} from "recharts";

import {wwcData} from "./wwc_data"
import "./wwc.css";

class WWCBarChart extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            data : wwcData,
            team:props.team,
            win_leauge:props.win
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }
    componentWillReceiveProps(newProps) {
        this.setState({team: newProps.team,win_leauge: newProps.win});
    }
  
    render() {
        console.log(this.state.team);
    const { activeIndex, data } = this.state;
      return(
          <>
        <BarChart
          width={250}
          height={150}
          data={wwcData}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="team" tick={false}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Bar type="number" dataKey="win_league" fill="#ff471a" background={{ fill: "#eee" }} onMouseOver={this.handleClick} >
            {
                data.map((entry, index) => (
                  <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#ff471a'} key={`cell-${index}`} />
                ))
            }
          </Bar>
        </BarChart>
            <div className="wwc-msg-container">
                <p className="wwc-message"><strong>{this.state.team}</strong> has <span style={{color:"rgb(255, 138, 116)",fontWeight:"bold"}}>{((this.state.win_leauge)*100).toFixed(1)}%</span> chance of winning the world cup.</p>
            </div> 
        </>
      )
    }
  }

export default WWCBarChart;