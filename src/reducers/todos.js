const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;

  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
    return state;
  }
};

export default todos;//reducer function

export const getVisibleTodos = (state, filter) => { // selector function, it selects something from the current state
  switch (filter) {
    case 'all':
      return state;
    case 'active':
      return state.filter(t => !t.completed);
    case 'completed':
      return state.filter(t => t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};
