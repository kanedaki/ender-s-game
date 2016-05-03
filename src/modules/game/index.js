import { wallColision, obstacleCollision } from '../../lib/colision'

function move({ cx, cy }, direction, speed=1) {
  switch(direction) {
    case 'up': 
      return {cx, cy: cy - speed }
    case 'down':  
      return {cx, cy: cy + speed }
    case 'right':  
      return {cx: cx + speed , cy }
    case 'left':
      return {cx: cx - speed , cy }
  }  
}

const initialState = {
  player: {
		id: 1,
    cx: 40,
    cy: 40,
    isMoving: true,
    direction: 'left'
  },
  bullets: [],
	polygons: [
    [[100,10], [250,150], [200,110]],
	  [[200, 200], [250, 200], [250,250], [200, 250]]
	],
	doors: [
		{
			player: 1,
			cx: 0,
			cy: 40
		},
		{
			player: 2,
			cx: 1000,
			cy: 250
		}	
	]
}

function bulletReducer(state, action, polygons) {
  switch(action.type) {
    case 'FIRE':
      return state.concat([ action.payload ]) 
    case 'GAME_UPDATED': {
      return state.filter((bullet) => {
        return (!wallColision({cx: bullet.cx, cy: bullet.cy}, bullet.direction) && !obstacleCollision([bullet.cx, bullet.cy, 1], polygons))
      }).map((bullet) => {
         return {...bullet, 
          ...move({cx: bullet.cx, cy: bullet.cy}, bullet.direction, 2)
         } 
      })  
    }
  }  
}

function playerReducer(state, action, polygons) {
  switch (action.type) {
    case 'MOVE_PLAYER':
			const possibleNextMove = move({cx: state.cx, cy: state.cy}, action.payload.direction)

			const colision = wallColision(possibleNextMove, state.direction) || obstacleCollision([possibleNextMove.cx, possibleNextMove.cy, 5], polygons)
			const nextPosition = colision ? {} : possibleNextMove
      return {...state,
        isMoving: true,
        direction: action.payload.direction,
				...nextPosition
      }
    case 'GAME_UPDATED': 
			// Add intersects with all polygons
      if (wallColision({cx: state.cx, cy: state.cy}, state.direction) || obstacleCollision([state.cx, state.cy, 6], polygons)) {
        return state.isMoving ? {...state, isMoving: false } : state  
      } else {
        return {...state, 
          ...move({cx: state.cx, cy: state.cy}, state.direction)
        }
      }
    default:
      return state
  }  
}

export default function game(state=initialState, action) {
  switch(action.type) {
    case 'FIRE':
      return {...state,
        bullets: bulletReducer(state.bullets, action)
      }
    case 'MOVE_PLAYER':
      return {...state,
        player: playerReducer(state.player, action, state.polygons)
      }
    case 'GAME_UPDATED':  
      return {...state,
        player: playerReducer(state.player, action, state.polygons),
        bullets: bulletReducer(state.bullets, action, state.polygons)
      }
    default: 
      return state
  } 
}
