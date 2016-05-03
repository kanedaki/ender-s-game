import { movePlayer, fire } from '../modules/game/actions'

export function startListeners(dispatch) {
  window.addEventListener('keydown', handleKeyDown.bind(null, dispatch), false)
} 

const possibleKeys = {
  ArrowUp: 'UP', 
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  KeyW: 'W', 
  KeyA: 'A',
  KeyS: 'S', 
  KeyD: 'D' 
}

function handleKeyDown(dispatch, e) {
  if (Object.keys(possibleKeys).includes(e.code)) {e.preventDefault()}
  switch(possibleKeys[e.code]) {
    case 'UP':
      return dispatch(movePlayer('up'))
    case 'DOWN':
      return dispatch(movePlayer('down'))
    case 'LEFT':
      return dispatch(movePlayer('left'))
    case 'RIGHT':
      return dispatch(movePlayer('right'))
    case 'W':
      return dispatch(fire('up'))
    case 'D':
      return dispatch(fire('right'))
    case 'A':
      return dispatch(fire('left'))
    case 'S':
      return dispatch(fire('down'))
  } 
}
