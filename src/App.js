import React, { Component } from 'react';
import './App.css';
import Projects from "./Components/Projects";
import uuid from 'uuid'
import AddProject from "./Components/AddProject";
import $ from 'jquery';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            projects:[],
            todos:[]
        };
    }
    getproject(){
        this.setState({projects: [
            {
                id:uuid.v4(),
                title: 'Business Website',
                category: 'Web Deisgn'
            }
        ]});
    }

    getTodos(){
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            dataType:'json',
            cache: false,
            success: function(data){
                this.setState({todos: data}, function(){
                    console.log(this.state);
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    componentWillMount(){
        this.getproject();
        this.getTodos();
    }

    handleAddProject(proj){
      let projects=this.state.projects;
      projects.push(proj);
      this.setState(projects);
    }

    handleDeleteProject(id){
        let projects = this.state.projects;
        let index = projects.findIndex(x => x.id === id);
        projects.splice(index, 1);
        this.setState({projects:projects});
    }

    render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />

        <Projects onDelete={this.handleDeleteProject.bind(this)} projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;
