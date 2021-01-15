import React, { useMemo , useState} from 'react'
import {wwcData} from './wwc_data'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "./wwc.css"
import WWCBarChart from './wwcChart';
export const WWC = () =>{
    const data = useMemo(() => wwcData, [])
    const bgcolors = ["rgb(68, 171, 67)","rgb(122, 195, 122)","rgb(166, 215, 165)","rgb(166, 215, 165)"]
    const bgcolors_2 = ["rgb(255, 236, 233)","rgb(255, 198, 200)","rgb(255, 138, 116)","rgb(255, 39, 0)"]
    function Rounttotwo(temp){
      return temp.toFixed(1);
    }
    function getmakrroundvalue(temp){
        return (temp*100).toFixed(0);
    }
    const spidataFormat = (cell,row) =>{
      return(
          <span>{Rounttotwo(cell)}</span>
      )
    }
    const ofidataFormat = (cell,row) =>{
      if((~~cell)>=3){
      return(
        <div className="ofi-background" style={{backgroundColor:bgcolors[(5-(~~cell))]}}>
          <span>{Rounttotwo(cell)}</span>
        </div>
      )}
     
      return(
        <div className="ofi-background" style={{backgroundColor:bgcolors_2[(2-(~~cell))]}}>
          <span>{Rounttotwo(cell)}</span>
        </div>
      )  
    }
    const defdataFormat = (cell,row) =>{
      if((~~cell)<1){
      return(
        <div className="ofi-background" style={{backgroundColor:"rgb(122, 195, 122)"}}>
          <span>{Rounttotwo(cell)}</span>
        </div>
      )}
      else if((~~cell)<2){
        return(
          <div className="ofi-background" style={{backgroundColor:"rgb(255, 198, 200)"}}>
            <span>{Rounttotwo(cell)}</span>
          </div>
        )}
        else if((~~cell)<3){
          return(
            <div className="ofi-background" style={{backgroundColor:"rgb(255, 138, 116)"}}>
              <span>{Rounttotwo(cell)}</span>
            </div>
          )}
    }
    const makeroundof16_dataFormat = (cell,row) =>{
      if((cell)===1){
        return (<div className="makeroundof16"><span>&#10004;</span></div>)
      }
      else if((cell)*100<1){
        return (<div className="makeround16_class">
          <span> &lt;1%</span></div>)
      }
      else if(getmakrroundvalue(cell)===100){
        return (<div className="makeroundof16">
          <span> &gt;99%</span></div>)
      }
      return (<div div className="makeround16_class"><span>{getmakrroundvalue(cell)}%</span></div>)
    }
    const makesemifinals_dataFormat = (cell,row) =>{
      if((cell)===0){
        return (<div><span>-</span></div>)
      }
      else if((cell)*100<1){
        return (<div>
          <span> &lt;1%</span></div>)
      }
      else if(getmakrroundvalue(cell)===100){
        return (<div>
          <span> &gt;99%</span></div>)
      }
      return <span>{getmakrroundvalue(cell)}%</span>
    }

    const [team,setteam] = useState('USA');
    const [win,setwin] = useState(23.6);

    function onRowMouseOver(row){
    setteam(row.team);
    setwin(row.win_league);
    }
  
    const options = {
      onRowMouseOver: onRowMouseOver,
    };

  return (
    <div>
    <div className="wwc-container">
    <div className="wwc-header">
        <BootstrapTable data={ data } options={options} >
            <TableHeaderColumn dataField='team' isKey={true} dataSort={ true } dataAlign='lefts' width='120' headerAlign='left' className="header">TEAM</TableHeaderColumn>
            <TableHeaderColumn dataField='group' dataSort={true} width='40' dataAlign='center'  headerAlign='left' className="header">GROUP</TableHeaderColumn>
            <TableHeaderColumn dataField='spi' dataFormat={spidataFormat} dataSort={ true }  width='50' headerAlign='center' dataAlign='right'className="header">SPI</TableHeaderColumn>
            <TableHeaderColumn dataField='global_o' dataFormat={ofidataFormat} dataSort={ true } width='50' dataAlign='right'  headerAlign='center' className="header">OFF</TableHeaderColumn>
            <TableHeaderColumn dataField='global_d' dataFormat={defdataFormat} dataSort={ true } width='50' dataAlign='right'  headerAlign='center' className="header">DIFF</TableHeaderColumn>
            <TableHeaderColumn dataField='make_round_of_16' dataFormat={makeroundof16_dataFormat} dataSort={ true } width='100' dataAlign='center'  headerAlign='center' className="header">MAKE ROUND OF 16</TableHeaderColumn>
            <TableHeaderColumn dataField='make_quarters' dataFormat={makeroundof16_dataFormat} dataSort={ true } width='80' dataAlign='center'  headerAlign='center' className="header">MAKE QTR-FINALS</TableHeaderColumn>
            <TableHeaderColumn dataField='make_semis' dataFormat={makesemifinals_dataFormat} dataSort={ true } width='80' dataAlign='center'  headerAlign='center' className="header">MAKE SEMIFINALS</TableHeaderColumn>
            <TableHeaderColumn dataField='make_final' dataFormat={makesemifinals_dataFormat} dataSort={ true } width='70' dataAlign='center'  headerAlign='center' className="header">MAKE FINAL</TableHeaderColumn>
            <TableHeaderColumn dataField='win_league' dataFormat={makesemifinals_dataFormat} dataSort={ true } width='80' dataAlign='center'  headerAlign='center' className="header">WIN WORLD CUP</TableHeaderColumn>
        </BootstrapTable>
    </div>
    </div>

    <WWCBarChart team={team} win={win} />

    </div>
  )
}