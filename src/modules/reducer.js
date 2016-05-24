import { combineReducers } from 'redux';
import game from './game/'
import gameState from './gameState/'

const rootReducer = combineReducers({
  game,
  gameState
});

export default rootReducer;
