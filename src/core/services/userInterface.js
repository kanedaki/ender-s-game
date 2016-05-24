import { movePlayer, fire } from 'modules/game/actions'

export function startListeners(dispatch) {
  window.addEventListener('keydown', handleKeyDown.bind(null, dispatch), false)
} 

const possibleKeys = {
  KeyW: 'up', 
  KeyQ: 'upLeft',
  KeyE: 'upRight',
  KeyA: 'left',
  KeyD: 'right',
  KeyZ: 'downLeft',
  KeyC: 'downRight',
  KeyS: 'down'
}

function handleKeyDown(dispatch, e) {
  if (Object.keys(possibleKeys).includes(e.code)) {
    e.preventDefault()
  } else {
    return
  }
  if (e.shiftKey) {
    return dispatch(movePlayer(possibleKeys[e.code])) 
  } else {
    return dispatch(fire(possibleKeys[e.code])) 
  }
}
