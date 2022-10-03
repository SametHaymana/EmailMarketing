import React from "react";


export default class MailList extends React.Component{

    subscribers_endpoint = "/api/v1/subscribers/";

    constructor(props){
        super(props);
        this.state={
            tasks:[],
        }
    }




    componentDidMount(){
        fetch(this.subscribers_endpoint)
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
                    <div class="col col-2">Template Name</div>
                    
                    
                </li>

 
      
        {this.state.tasks.map((task,index)=>{
            return(
                
                
                <li class="table-row" key={index}>
                    <div class="col col-1" data-label="Job Id"><a href={task.id}>{task.id}</a></div>
                    <div class="col col-2" data-label="Customer Name">{task.name}</div>
                    
                    
                </li>
                
                
                
                )
        })}


      </ul>
   
        )
}
}