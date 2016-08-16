import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers/index';

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
});

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   }
// });

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo } //mapping object used in place of mapDispatchToProps since the arguments used are the same (id)
)(TodoList));

export default VisibleTodoList;
