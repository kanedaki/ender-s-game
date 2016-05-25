import initialState from './initialState'

function bulletsReducer(state, action, polygons) {
  switch(action.type) {
    case 'FIRE':
      return state.concat([ action.payload ]) 
    case 'UPDATE_BULLETS': 
      return action.payload.bullets
  }  
}

function playerReducer(state, action, polygons) {
  switch (action.type) {
		case 'PLAYER_IMPACTED': 
			return {
				...state,
				status: state.status === 'ok' ? 'injured' : 'inmobilized' 
			}
    case 'MOVE_PLAYER':
      return {...state,
        isMoving: true,
        direction: action.payload.direction,
				...action.payload.nextPosition
      }
    case 'UPDATE_PLAYER_POSITION':
      const position = action.payload.position
      return {...state, ...position}
    case 'PLAYER_COLLISION':
      return state.isMoving ? {...state, isMoving: false} : state
    default:
      return state
  }  
}

export default function game(state=initialState, action) {
  switch(action.type) {
    case 'FIRE':
    case 'UPDATE_BULLETS':
      return {...state,
        bullets: bulletsReducer(state.bullets, action)
      }
    case 'UPDATE_PLAYER_POSITION':
    case 'PLAYER_COLLISION':
    case 'MOVE_PLAYER':
      return {...state,
        players: {
          ...state.players,
          [state.me]: playerReducer(state.players[state.me], action)
        }
      }
		case 'PLAYER_IMPACTED':
			const { playerId } = action.payload
			return {...state,
				players: {
					...state.players,
					[playerId]: playerReducer(state.players[playerId], action)
				}
			}
    default: 
      return state
  } 
}
