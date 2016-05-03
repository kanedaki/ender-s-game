import { startListeners } from '../../lib/userInterface'
import { wallColision } from '../../lib/colision'

function ableToJump(position, direction) {
  switch(direction) {
    case 'up':
      return wallColision(position, 'down')
    case 'down':
      return wallColision(position, 'up')
    case 'left':
      return wallColision(position, 'right')
    case 'right':
      return wallColision(position, 'left')
  }  
}

export function movePlayer(direction) {
  return (dispatch, getState) => {
    const player = getState().game.player
    const {cx, cy, isMoving} = player
    if (!isMoving || ableToJump({cx, cy}, direction)) {
      dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          direction   
        }
      })  
    }
  }
}

export function startGame() {
  return (dispatch, getState) => {
    startListeners(dispatch)
    loop(dispatch)  
    dispatch({
      type: 'GAME_STARTED'  
    })
  }
}

export function fire(direction) {
  return (dispatch, getState) => {
    const player = getState().game.player
    dispatch({
      type: 'FIRE',
      payload: {
        direction,
        cx: player.cx,
        cy: player.cy
      }
    }) 
  }
}

function updateGame(dispatch) {
  dispatch({
    type: 'GAME_UPDATED'  
  }) 
  loop(dispatch)
}

function loop(dispatch) {
  return requestAnimationFrame(updateGame.bind(null, dispatch))  
}
