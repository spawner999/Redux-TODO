import React from 'react';
import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const App = ({ params }) => ( //available from the route handler
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all' }/> 
    <Footer />
  </div>
);

export default App;
