import React, { Component } from 'react'
import {Outlet } from 'react-router-dom';
import { Button, Dropdown, Menu ,Container,  } from 'semantic-ui-react'
import { Link } from "react-router-dom";




export default class Nav extends Component {
  state = { 
    activeItem: 'Home',
    curerntDate: (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds(),
   }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

 

  render() {
    const { activeItem } = this.state

    return (
      <Container>
      <Menu  size='large'>
        <Menu.Item
          name='Home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name='Tasks'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
          as={Link}
          to="Tasks"
        />        
        <Menu.Item
          name='Templates'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
          as={Link}
          to="Templates"
        />
        <Menu.Item
          name='Subscribers'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
          as={Link}
          to="Subscribers"
        />

        <Menu.Menu position='right'>
        <Menu.Item
          name= "Time"
          

        />

        

          <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Outlet/>
      </Container> 
    )
  }
}