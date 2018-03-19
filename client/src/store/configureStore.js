<<<<<<< HEAD
// TODO
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}
=======
// TODO
>>>>>>> f40d93314447cf7d7e6b4a946b4baa39f4eaa015
