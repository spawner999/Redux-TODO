import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

//making this a react component so that it's possible to access its lifecycle and make the api call there
class VisibleTodoList extends Component {
  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    };
  }

  fetchData(){
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos =>
      receiveTodos(filter, todos) // get the todos from server then dispatch an action
    )
  }
  render() {
    //destructuring the props as toggle Todo as to be passed down under a different name
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />; //presentational component
  }
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'; //explicitly saving the filter
  return {
    todos: getVisibleTodos(state, filter),
    filter //make it available inside the component
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   }
// });

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  // { onTodoClick: toggleTodo } //mapping object used in place of mapDispatchToProps since the arguments used are the same (id)
  actions //now we have multiple actions so we import the whole object above
)(VisibleTodoList));

export default VisibleTodoList;
