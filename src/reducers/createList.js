//this function creates a reducer based on the filter
const createList = (filter) => {
  return (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id); //get the response from server then save the ids
      default:
        return state;
    }
  };
};

export default createList;

export const getIds = (state) => state; //this just returns the state of the list for now, but it could do other operations before that in the future
