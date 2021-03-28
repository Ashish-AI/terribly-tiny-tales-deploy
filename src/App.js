import React from 'react'
import './index.css'

export default class App extends React.Component{
  state = {
    values:"",
    response:"",
    loading:false,
  }
  onChange = e =>{
    this.setState({values:e.target.value});
  }

  convertToJSONArray = () => {
    if(!this.validateValues) return null;
    const arr = this.state.values.split(",");
    console.log(arr)
    return JSON.stringify({data:arr});
  }
  sendData = () => {
    this.setState({loading:true});
    if(this.state.values.length <= 0){
      alert("Invalid roll number(s)!!!");
      return;
    }
    else{
      const arr = this.state.values.split(",");
      // console.log("arr: "+arr+ typeof arr);
      const JSONdata = {data:arr};

      const url = "http://localhost:3010/sendData";
      var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(JSONdata),
        headers: {
          "Content-Type": "application/json"
        }
      });
      fetch(request) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({response:JSON.stringify(data)});
        this.setState({loading:false});
      });
    }
  }
  render(){
    return(
      <div>
        <input value={this.state.values} type="text" onChange={this.onChange}/>
        <button onClick={this.sendData} className="button"><span>Submit</span></button>
        <h1>{this.state.loading && "Loading..."}</h1>
        <div>
          {/* {this.state.response} */}
          {this.state.response && 
            <TableComp tableData={this.state.response}/>
          }
        </div>
      </div>
    )
  }
}
function TableComp(props){
  const tableData = JSON.parse(props.tableData);
  tableData.sort((a,b) => (parseInt(a.item) > parseInt(b.item)) ? 1 : ((parseInt(b.item) > parseInt(a.item)) ? -1 : 0))
  return(
    <div>
      <h3>Data</h3>
      <table>
        <thead>
          <tr>
            <td>Roll</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
        {tableData.map((result,index)=>(
          <tr key={index}>
            <td>{result["item"]}</td>
            <td>{result["value"]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}