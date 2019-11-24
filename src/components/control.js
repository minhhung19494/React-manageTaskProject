import React, {Component} from 'react';

class Control extends Component {
    constructor(props){
        super(props);
        this.state ={
            keyword: '',
            sort :{by:'name', value:1}
        };
    }
    onClick = (sortBy, sortValue)=>{
        this.setState({
            sort:{
                by: sortBy,
                value: sortValue
            }
        })
        this.props.onSort(sortBy, sortValue);
    }
    inputKeyword = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }
    search = ()=>{
        this.props.onSearch(this.state.keyword)
    }
	render(){
        var {keyword, sort} = this.state;
            return(
              		<div>
                      <br/>
                      <div className="row">
                            <input type="text" id="input" name="keyword" className="searchBox form-control col-md-6" placeholder="Nhập từ khoá..." value={keyword} onChange={this.inputKeyword}/>
                            <button type="button" className="searchButton btn btn-primary col-md-1" onClick={this.search}>Tìm</button>
                                <div className="dropdown col-md-2">
                                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sắp xếp
                                  </button>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className={( sort.by ==='name'&&sort.value=== 1 )?"sortSelected":"dropdown-item"} 
                                    onClick={()=>this.onClick('name', 1)} >Tên A-Z</a>
                                    <a className={( sort.by ==='name'&&sort.value=== -1 )?"sortSelected":"dropdown-item"} 
                                    onClick={()=>this.onClick('name', -1)}>Tên Z-A</a>
                                    <a className={( sort.by ==='status'&&sort.value=== 1 )?"sortSelected":"dropdown-item"} 
                                    onClick={()=>this.onClick('status', 1)}>Trạng thái kích hoạt</a>
                                    <a className={( sort.by ==='status'&&sort.value=== -1 )?"sortSelected":"dropdown-item"} 
                                    onClick={()=>this.onClick('status', -1)}>Trạng thái ẩn</a>
                                  </div>
                                </div>
                      </div>
                    </div>
        		);
            }
}
export default Control;