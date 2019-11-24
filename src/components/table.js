import React, {Component} from 'react';
import TableItem from './tableItem'

class TableBox extends Component{
	constructor(props){
		super(props);
		this.state ={
			filterName : '',
			filterStatus : -1
		};
	}

	onUpdateStatus=(id)=>{
		this.props.onUpdateStatus(id);
	}
	filter = (event)=>{
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.props.onFilter(
			name ==='filterName' ? value : this.state.filterName,
			name ==='filterStatus' ? value : this.state.filterStatus);
		this.setState({
			[name] : value
		});
	}
	render(){
		var {tasks} = this.props;
		var {filterName, filterStatus} = this.state;
		var elmTasks = tasks.map((task,index)=>{
				return 	<TableItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}/>
		});
		return(
				<div>
					<table className="table table-hover table-bordered" >
	                  <thead>
	                    <tr>
	                      <th>STT</th>
	                      <th>Tên</th>
	                      <th>Trạng thái</th>
	                      <th>Hành động</th>
	                    </tr>
	                  </thead>
	                  <tbody>
	                    <tr>
	                      <td></td>
	                      <td><input name="filterName" value={filterName} onChange={this.filter} className="form-control" type="text"/></td>
	                      <td>
	                          <select name="filterStatus" value={filterStatus} onChange={this.filter} id="input" className="form-control" required="required">
	                            <option value={-1}>Tất cả</option>
	                            <option value={1}>Kích hoạt</option>
	                            <option value={0}>Ẩn</option>
	                          </select>
	                      </td>
	                      <td></td>
	                    </tr>
	                    {elmTasks}
	                  </tbody>
	                </table>
                </div>
		);
	}
}
export default TableBox;