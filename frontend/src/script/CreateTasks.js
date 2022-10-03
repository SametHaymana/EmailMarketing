import React from "react";
import { Grid, Form, Select, Input, TextArea, Button,Icon } from 'semantic-ui-react'



function DataPicker(prob){
    
    return(
        <>
        <label for={prob.id}>{prob.label}</label>
        <input
            id={prob.id}
            type="datetime-local"
            name={prob.id}
            value={prob.value}
            min= {prob.min}
             />
        </>
    )
}



export default class CreateTasks extends React.Component{
    templates_endpoint = "/api/v1/templates/"
    mailList_endpoint = "/api/v1/subscribers/"


    intervals=[
        { key: 1, text: "Every 10 Second", value: 10 },
        { key: 2, text: "Every 15 Min", value: 900 },
        { key: 3, text: "Every 30 Min", value: 1800 },
        { key: 4, text: "Every hours", value: 3600 },
        { key: 5, text: "Ones a Day", value: 86400 },
        { key: 5, text: "Ones day a Week", value: 604800 },
        { key: 5, text: "Ones day a Monthly", value: 2592000 },

    ]


    constructor(props){
        super(props);
        this.state={

            Date : new Date(),
            Templates: [],
            MailLists: [],
            TemplateLoaded : false,
            MailListLoaded : false,
            StartTimeActivity : true,
        
        }
    }


    fetchTemplate(){
        fetch(this.templates_endpoint)
        .then((response) => response.json())
        .then((data)=>{
            var state = this.state;
            state.Templates = data;
            state.TemplateLoaded = true;
            this.setState(state);
        },(error)=>{
            console.log(error)
        })
    }

    fetchMailList(){
        fetch(this.mailList_endpoint)
        .then((response) => response.json())
        .then((data)=>{
            var state = this.state;
            state.MailLists = data;
            state.MailListLoaded = true;
            this.setState(state);
        },(error)=>{
            console.log(error)
        })
       
    }



    getTemplates(){
        var choices = []
        
            for(let t of this.state.Templates){
                
                choices.push(
                    { key: t.id, text: t.template_name, value: t.id }
                )
            }
        return choices;
    }

    getMailList(){
        var choices = []
            
            for(let t of this.state.MailLists){
                
                choices.push(
                    { key: t.id, text: t.name, value: t.id }
                )
            }
        return choices;

    }

    

    setTemplate(e, data){
        
        var selectedTemplate;
      

        if(data){
            for(let t of this.state.Templates){

                if(t.id === data.value){
                    selectedTemplate = t;
                }
            }
        }
        document.getElementById("Subject").value = selectedTemplate.subject;
        document.getElementById("Message").innerHTML = selectedTemplate.message;
        
    }

    setMailList(e,data){
        var selectedMailList;
        if(data){
            
            for (let e of this.state.MailLists){
                if(e.id === data.value){
                    selectedMailList = e;
                }
            }
        }
        var receiver = selectedMailList.mail_address.replaceAll(",","\n")
        document.getElementById("MailList").value = receiver;
    }

    checkBoxManager(e,data){
        if(this.state.StartTimeActivity) {
            document.getElementById("DataPicker").disabled = true; 
            var state = this.state;
            state.StartTimeActivity = false;
            this.setState(state);

        }
        else {   
            document.getElementById("DataPicker").disabled = false;
            var state = this.state;
            state.StartTimeActivity = true;
            this.setState(state);
        }

    }

    saveTemplate(){/*
        var taskName = document.getElementById("TaskName").innerHTML ;
        var subject = document.getElementById("Subject").innerHTML;
        var message = document.getElementById("Message").innerHTML;
        const data = {
            "template_name" : taskName,
            "subject" : subject,
            "message" : message
        }
        console.log(data)
        const requestOptions={
            method: "POST",
            
            body: JSON.stringify(data)
        }
        
        fetch(this.templates_endpoint)
        .then((response)=> response.json())
        .then((data)=>{
            
        })

        */
       
    }



    componentDidMount(){
        this.fetchTemplate();
        this.fetchMailList();
       


    }



    render() {
        
        return(
            
            <Form>
            <Grid >
            <Grid.Column floated="left" width={8}>
                        <Form.Field
                            control={Select}
                            options={ this.getTemplates()}
                            label={{ children: 'Use Template', htmlFor: 'select-template' }}
                            placeholder='Use Template'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                            onChange={(e,data) =>this.setTemplate(e,data)}
                        />

                        <Form.Field
                            id='TaskName'
                            control={Input}
                            label='Task Name'
                            placeholder=''
                            required={true}
                        />
                        <Form.Field
                            id='Subject'
                            control={Input}
                            label='Message Subject'
                            placeholder=''
                            required={true}
                        />
                        <Form.Field
                            id='Message'
                            control={TextArea}
                            label='Message'
                            placeholder=''
                            required={true}
                            rows={15}
                        />

            </Grid.Column>
            
        
                <Grid.Column  width={8}>

                        <Form.Field
                            control={Select}
                            options={ this.getMailList() }
                            label={{ children: 'Use Template', htmlFor: 'select-template' }}
                            placeholder='Use Template'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                            onChange={(e,data)=> this.setMailList(e,data)}
                            
                        />

                        <Form.Field
                            id='MailList'
                            control={TextArea}
                            label='Mailers'
                            placeholder=''
                            required={true}
                        />

                        <Form.Field
                            control={Select}
                            options={ this.intervals }
                            label={{ children: 'Interval', htmlFor: 'select-template' }}
                            placeholder='Repaiting interval'
                            onChange=""
                            
                        />

                        <DataPicker
                        
                        id="DataPicker"
                        label="Start Time"
                        min={this.state.Date.toISOString().substring(0,16)}

                        />
                        
                        <Form.Checkbox 
                        id="StartNow"
                        label='Start Now'
                        onChange={(e,data)=> this.checkBoxManager(e,data)}
                         />
                        

                    <Button.Group floated="right">
                        <Button
                            onClick={this.saveTemplate()}
                        >
                        Save As Template
                        
                        </Button>

                        <Button.Or />

                        <Button positive
                            onClick={() => console.log("Started")}
                        >
                        Start Task
                        
                        </Button>

                    </Button.Group>


                    
                </Grid.Column>

            </Grid>

            </Form>

        )
    }
}


