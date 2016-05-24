import { startListeners } from 'core/services/userInterface'
import { wallCollision, oppositeDoorCollision, bulletCollision } from 'core/logic/collision'
import { playerWin } from 'modules/gameState/actions'

function move({ cx, cy }, direction, speed=1) {
  switch(direction) {
    case 'up': 
      return {cx, cy: cy - speed }
    case 'upLeft': 
      return {cx: cx - speed, cy: cy - speed }
    case 'upRight': 
      return {cx: cx + speed, cy: cy - speed }
    case 'down':  
      return {cx, cy: cy + speed }
    case 'downLeft':  
      return {cx: cx - speed, cy: cy + speed }
    case 'downRight':  
      return {cx: cx + speed, cy: cy + speed }
    case 'right':  
      return {cx: cx + speed , cy }
    case 'left':
      return {cx: cx - speed , cy }
  }  
}

function ableToJump(radio, position, direction, polygons) {
  switch(direction) {
    case 'up':
      return wallCollision(radio, move(position, 'down'), polygons) || wallCollision(radio, move(position, 'right'), polygons) || wallCollision(radio, move(position, 'left'), polygons)
    case 'down':
      return wallCollision(radio, move(position, 'up'), polygons) || wallCollision(radio, move(position, 'right'), polygons) || wallCollision(radio, move(position, 'left'), polygons)
    case 'left':
      return wallCollision(radio, move(position, 'down'), polygons) || wallCollision(radio, move(position, 'right'), polygons) || wallCollision(radio, move(position, 'up'), polygons)
    case 'right':
      return wallCollision(radio, move(position, 'down'), polygons) || wallCollision(radio, move(position, 'up'), polygons) || wallCollision(radio, move(position, 'left'), polygons)
  }
}

export function movePlayer(direction) {
  return (dispatch, getState) => {
    const { polygons, players, me} = getState().game,
          {cx, cy, isMoving, radio} = players[me]
    if (!isMoving || ableToJump(radio, {cx, cy}, direction, polygons)) {
			const possibleNextMove = move({cx, cy}, direction),
            collision = wallCollision(radio, possibleNextMove, polygons) 
      dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          direction,
          nextPosition: collision ? {cx, cy} : possibleNextMove
        }
      })  
    }
  }
}

export function startGame() {
  return (dispatch, getState) => {
    startListeners(dispatch)
    loop(dispatch, getState)  
    dispatch({
      type: 'GAME_STARTED'  
    })
  }
}

function calculateBulletStartingPoint(direction, {cx, cy}) {
	switch(direction) {
		case 'up':
			return {cx, cy: cy - 4}
		case 'upLeft':
			return {cx: cx - 4, cy: cy - 4}
		case 'upRight':
			return {cx: cx + 4, cy: cy - 4}
		case 'left':
			return {cx: cx - 4, cy}
		case 'right':
			return {cx: cx + 4, cy}
		case 'downLeft':
			return {cx: cx - 4, cy: cy + 4}
		case 'downRight':
			return {cx: cx + 4, cy: cy + 4}
		case 'down':
			return {cx: cx + 4, cy}
	}
}

export function fire(direction) {
  return (dispatch, getState) => {
    const { players, me } = getState().game,
          player = players[me],
					position = calculateBulletStartingPoint(direction, player)
    dispatch({
      type: 'FIRE',
      payload: {
        direction,
				...position,
        speed: 2,
        radio: 1
      }
    }) 
  }
}

function playerCollision() {
  return {
    type: 'PLAYER_COLLISION' 
  }  
}

function updatePlayerPosition(position) {
  return {
    type: 'UPDATE_PLAYER_POSITION',
    payload: {
      position  
    }
  }  
}

function managePlayer(dispatch, {isMoving, cx, cy, direction, radio, team}, polygons, doors) {
  if (isMoving) {
    const possibleNextMove = move({cx, cy}, direction)
    if (oppositeDoorCollision([possibleNextMove.cx, possibleNextMove.cy, radio], doors, team)) {
      dispatch(playerWin())  
    }
    if (wallCollision(radio, possibleNextMove, polygons)) {
      dispatch(playerCollision())
    } else {
      dispatch(updatePlayerPosition(possibleNextMove))
    }
  }
}

function updateBullets(bullets) {
  return {
    type: 'UPDATE_BULLETS',
    payload: {
      bullets  
    }
  }  
}

function playerImpacted(playerId) {
	return {
		type: 'PLAYER_IMPACTED',
		payload: {
			playerId
		}
	}
}

function manageBullets(dispatch, bullets, polygons, players) {
  let nextMove, impactedPlayers 
  const bulletsLeft = bullets.filter((bullet) => {
    nextMove = move({cx: bullet.cx, cy: bullet.cy}, bullet.direction)
    impactedPlayers = bulletCollision(bullet.radio, nextMove, players)
		Object.keys(impactedPlayers).forEach((key) => {
			debugger;
			dispatch(playerImpacted(key))
		})
    return !wallCollision(bullet.radio, nextMove, polygons) && Object.keys(impactedPlayers).length == 0
  }).map((bullet) => {
     return {...bullet, 
      ...move({cx: bullet.cx, cy: bullet.cy}, bullet.direction, bullet.speed)
     } 
  })  
  dispatch(updateBullets(bulletsLeft))
}

function updateGame(dispatch, getState) {
  const { gameState, game } = getState()
  const { players, polygons, doors, bullets, me } = game
  managePlayer(dispatch, players[me], polygons, doors)
  manageBullets(dispatch, bullets, polygons, players)
  dispatch({
    type: 'GAME_UPDATED'  
  }) 
  if (gameState !== 'FINISHED') {
    loop(dispatch, getState)
  }
}

function loop(dispatch, getState) {
  return requestAnimationFrame(updateGame.bind(null, dispatch, getState))  
}
