import React , {Component} from 'react'

class TableItem extends Component{

	changeStatus = ()=>{
		this.props.onUpdateStatus(this.props.task.id);
	}

	Delete = ()=>{
		this.props.onDelete(this.props.task.id);
	}
	onUpdate = ()=>{
		this.props.onUpdate(this.props.task.id);
	}

	render(){
		var {task, index} = this.props;
		return(
						<tr key={task.id}>
	                        <td>{index+1}</td>     
	                        <td>{task.name}</td>  
	                        <td>
	                            <label 
	                            	htmlFor="" 
	                            	className={task.status === true ? 'badge badge-danger' : 'badge badge-success'}
	                            	onClick={this.changeStatus}>
	                            	{task.status === true ? "Kích hoạt" : "Ẩn"}
                            	</label>
	                        </td>  
	                        <td>
	                            <button className="btn btn-primary" onClick={this.onUpdate}>Sửa</button>&nbsp;
	                            <button className="btn btn-primary" onClick={this.Delete}>Xoá</button> 
	                        </td>             
	                    </tr>

		);
	}
}
export default TableItem;