import React,{ Component} from "react";
import {Grid, Button} from "semantic-ui-react";







export default class Task extends Component{
    endpooint = "/api/v1/tasks/"

    url = window.location.toString();
    id = this.url.split("/")[4]

    task_endpoint = this.endpooint + this.id + "/";

    constructor(probs){
        super(probs);
        this.state = {
            task : {}
        }   
    }

    componentDidMount(){
        fetch(this.task_endpoint)
        .then((response) => response.json())
        .then((data) => {
            this.setState({task: data});
            console.log(data)
        })
        
    }

    convertTimstptotime(){
        var date = new Date(this.state.task.start_date * 1000);

        var year = date.getFullYear();
        var mouth = date.getMonth();
        var day = date.getDay()
        var hours = date.getHours()
        var minute = date.getMinutes()

        return (day + "/" + mouth + "/"+ year  + " " + hours +":" + minute )

    }

    render() {
        return(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}> 
                        <h4>Id :   {this.state.task.id}</h4>
                        <h4>Name :  {this.state.task.name} </h4>
                        

                     </Grid.Column>
                    <Grid.Column width={10}> 
                        <h4> { this.state.task.subject}</h4>
                     </Grid.Column>
                    <Grid.Column width={3}> <Button color="yellow">Stop Task</Button> </Grid.Column>


                </Grid.Row>

                <Grid.Row>

                    <Grid.Column width={3}> 
                        <h4>Interval :   {this.state.task.repeater_interval}</h4>
                        <h4>Name :  {this.state.task.name} </h4>
                        <h4>Start Date :  {this.state.task.start_date} </h4>
                        <h4>Started : {(new Boolean(this.state.task.is_started)).toString()  }</h4>
                        <h4>Running : {(new Boolean(this.state.task.is_running)).toString()  }</h4>


                    </Grid.Column>
                    <Grid.Column width={10}> 
                                <h5> {this.state.task.message}</h5> 
                        
                     </Grid.Column>
                    <Grid.Column width={3}> <Button color="red">Delete Task</Button> </Grid.Column>
                    
                </Grid.Row>

            </Grid>
        )
    }
}