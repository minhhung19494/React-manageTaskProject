import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Control from './components/control';
import TableBox from './components/table';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm: false,
      taskEditing : null, 
      filter:{name: '',status: -1},
      keyword : '',
      sort : {by: 'name',value: 1}
    }
  }
    componentDidMount(){
        if(localStorage && localStorage.getItem('tasks')){
          var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({'tasks':tasks});
        }
    }
  openForm(){
    if(!this.state.isDisplayForm)
        this.setState({
            isDisplayForm : true 
        });
  }

  onCloseForm = () =>{
    this.setState({
      isDisplayForm : !this.state.isDisplayForm
    });
  }
  onCreateForm = ()=>{
    this.setState({
      'isDisplayForm': true,
      taskEditing : null
    });
  }
  onSubmit = (data)=>{
    var {tasks} =this.state;
    var id = data.id
    if(id===""){
        data.id = this.generateID();
        tasks.push(data);
    }else{
        var index = this.findIndex(id);
        tasks[index] = data;
    }   
    this.setState({
        tasks: tasks,
        taskEditing: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  onUpdateStatus =(id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
    }
    this.setState({tasks:tasks});
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onDelete = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index,1);
    }
    this.setState({tasks:tasks});
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onUpdate = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    if(index !== -1){
      this.setState({taskEditing:taskEditing });
    }
    this.openForm();
  }
  onFilter =(filterName, filterStatus)=>{
    filterStatus = parseInt(filterStatus,10);
    this.setState({
        filter:{
            name: filterName.toLowerCase(),
            status: filterStatus
        }
    })
  }
  onSearch = (keyword)=>{
    this.setState({
        keyword : keyword.toLowerCase()
    })
  }
  onSort =(sortBy, sortValue)=>{
    console.log(sortBy, sortValue);
    this.setState({
        sort: {
            by:sortBy,
            value: sortValue
        }
    });
  }

  findIndex = (id)=>{
    var{tasks} = this.state;
    var result = -1
    tasks.forEach((task,index)=>{
      if(task.id === id){
        result = index;
      }
    })
    return result;
  }

  randomElement(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }

  generateID(){
    return this.randomElement() + this.randomElement()+'-' +this.randomElement()
  }


  render(){
    var {tasks, isDisplayForm, taskEditing, filter, keyword, sort} = this.state;
    if(filter.name){
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(filter.name) !== -1
        })
    }
    tasks = tasks.filter((task)=>{
        if (filter.status === -1){
            return task
        }else{
            return task.status === (filter.status === 1 ? true: false)
        }
    })
    if(sort.by = 'name'){
        tasks.sort((a,b)=>{
            if(a.name > b.name) return sort.value;
            else if(a.name<b.name) return -sort.value;
            else return 0;
        });
    }else{
            tasks.sort((a,b)=>{
            if(a.status > b.status) return -sort.value;
            else if(a.status<b.status) return sort.value;
            else return 0;
        });
    }
    var elmTaskFrom = isDisplayForm === true ? 
            <TaskForm 
                onSubmit={this.onSubmit} 
                onCloseForm={this.onCloseForm} 
                taskEditing={taskEditing}/> : "";
    if(keyword){
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(keyword) !== -1
        })
    }
    return (
      <div className="container">
          <div className="pageheader text-center" >
            <h1>Quản lý công việc</h1>
          </div>
          <div className="row">
              <div className="leftBox col-md-4">
                   {elmTaskFrom}
              </div>
              <div className={isDisplayForm === true ? 'rightBox col-md-8': 'rightBox col-md-12'}>
              <div className="controlBox">
                <div>
                    <button type="button" className="btn btn-primary col-md-3" onClick={this.onCreateForm}>Thêm công việc</button>&nbsp;
                </div>
                    <Control onSearch={this.onSearch} onSort={this.onSort}/>
              </div> 
              <br/> 
              <div className="tableBox col-md-12">
                  <TableBox tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter}/>
              </div>
              </div>
          </div>
      </div>
    );
  }
}
export default App;


