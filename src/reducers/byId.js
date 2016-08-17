//Lookup table, has all todos with id key
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const nextState = { ...state }; //shallow copy of the current state (it corresponds to the lookup table)
      action.response.forEach(todo => {
        nextState[todo.id] = todo; //fine to use a mutation in this case, this adds stuff based on response
      });
      return nextState;
    default:
    return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];
