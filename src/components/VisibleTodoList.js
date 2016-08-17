import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

//making this a react component so that it's possible to access its lifecycle and make the api call there
class VisibleTodoList extends Component {
  componentDidMount(){
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  };
  componentDidUpdate(prevProps){
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    };
  };
  render() {
    return <TodoList {... this.props} />;
  }
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'; //explicitly saving the filter
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   }
// });

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo } //mapping object used in place of mapDispatchToProps since the arguments used are the same (id)
)(VisibleTodoList));

export default VisibleTodoList;
