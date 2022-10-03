import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../design/index.css"




export default class TaskList extends React.Component{
    tasks_endpoint = "/api/v1/tasks/";

    constructor(props){
        super(props);
        this.state={
            tasks:[],
        }
    }




    componentDidMount(){
        fetch(this.tasks_endpoint)
        .then((res) => res.json())
        .then((data)=>{
            var state = this.state;
            state.tasks = data;
            this.setState(state);
        })
    }

    render(){



            
        return(
            
        <ul class="responsive-table">
                <li class="table-header">
                    <div class="col col-1">Id</div>
                    <div class="col col-2">Task Name</div>
                    <div class="col col-3"> Status </div>
                    
                </li>

 
      
        {this.state.tasks.map((task,index)=>{
            return(
                
                
                <li class="table-row" key={index}>
                    <div class="col col-1" data-label="Job Id"><Link to={"/Tasks/"+task.id}>{task.id}</Link></div>
                    <div class="col col-2" data-label="Customer Name">{task.name}</div>
                    <div class="col col-3" data-label="Amount">{task.is_running ? "Running" : "Not Running"}</div>
                    
                </li>
                
                
                
                )
        })}


      </ul>
   
        )
    }
}