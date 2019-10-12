import React, { Component } from 'react';
import store from './store'
import {connect} from 'react-redux'


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
    }

    render() { 
        let {inputValue,inputChange,addItem,deleteItem} = this.props

        return (  
            <div>
                <div>
                    <input 
                        value={inputValue}
                        onChange = {inputChange}
                    />
                    <button
                        onClick = {addItem}
                    >提交</button>
                </div>
                <ul>
                    {
                        this.props.list.map((item,index)=>{
                            return(
                                <li 
                                    key = {index}
                                    onClick = {deleteItem.bind(this,index)}
                                >{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
 
const stateToProps = (state)=>{
    return{
        inputValue:state.inputValue,
        list:state.list
    }
}

const dispatchToProps = (dispatch)=>{
    return {
        inputChange(e){
            let action = {
                type:'change_input',
                value:e.target.value
            }
            dispatch(action)
        },
        addItem(){
            let action = {
                type:'add_item'
            }
            dispatch(action)
        },
        deleteItem(index){
            let action = {
                type:'delete_item',
                index:index
            }
            dispatch(action)
        }
    }
}



export default connect(stateToProps,dispatchToProps)(TodoList);