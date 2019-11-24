import React, {Component} from 'react';

class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name:'',
            status: false
        };
    }
    componentDidMount(props){
        if(this.props.taskEditing !== null){
            this.setState({
                id : this.props.taskEditing.id,
                name : this.props.taskEditing.name,
                status : this.props.taskEditing.status
            });
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.taskEditing !== this.props.taskEditing && this.props.taskEditing !== null){
            this.setState({
                id : this.props.taskEditing.id,
                name : this.props.taskEditing.name,
                status : this.props.taskEditing.status
            });
        }else if (prevProps.taskEditing !== this.props.taskEditing && this.props.taskEditing === null) {
            this.setState({
                id : '',
                name:'',
                status: false});
        }
    }
    onCloseFormChild = () =>{
        this.props.onCloseForm()
        }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value
        if(name === "status"){
            value =  target.value === "true" ? true: false;
        }     
        this.setState ({
            [name]: value
        });
    }
    onClear = ()=>{
        this.setState({
            name: "",
            status: false
        });
    }
    onSubmit = (event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseFormChild();
    }
    render(){
        var {id} =this.state;

	return(
              <div>  
                <div className="panel panel-warning alert alert-primary"> 
                  <div className="panel-heading">             
                    <h3 className="panel-title <text-center></text-center>">
                        {id !=='' ? "Cập nhật công việc":"Thêm công việc"}
                        <button type="button" className="close" onClick={this.onCloseFormChild}>
                            <span>&times;</span>
                        </button>
                    </h3>
                  </div>
                </div>    
                <form className="padding10" onSubmit={this.onSubmit}>      
                    <div className="form-group">
                        <label htmlFor="">Tên:</label>
                        <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.onChange} />
                        <label htmlFor="">Trạng thái:</label>
                        <select name="status" id="" className="form-control" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                    </div>
                  <button type="submit" className="btn btn-primary">Lưu lại</button>&nbsp;
                  <button type="button" className="btn btn-primary" onClick={this.onClear}>Huỷ bỏ</button>
                </form>
            </div>

		);
    }
}
export default TaskForm;