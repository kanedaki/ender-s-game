const initialState = {
  me: '1',
  players: {
    1: {
      team: 'red',
			status: 'ok',
      radio: 6,
      cx: 7,
      cy: 20,
      isMoving: false,
      direction: 'left'
    },
    2: {
      team: 'red',
			status: 'ok',
      radio: 6,
      cx: 7,
      cy: 26,
      isMoving: false,
      direction: 'left'
    },
    3: {
      team: 'blue',
			status: 'ok',
      radio: 6,
      cx: 493,
      cy: 250,
      isMoving: false,
      direction: 'left'
    },
    4: {
      team: 'blue',
			status: 'ok',
      radio: 6,
      cx: 493,
      cy: 256,
      isMoving: false,
      direction: 'left'
    }
  },
  bullets: [],
	polygons: [
    [[100,100], [150,100], [150,300], [100, 300]],
	  [[300, 200], [350, 200], [350,250], [300, 250]],
	  [[300, 400], [350, 400], [350,450], [300, 450]]
	],
	doors: [
		{
      team: 'red',
			cx: 0,
			cy: 20,
      dx: 0,
      dy: 60
		},
		{
      team: 'blue',
			cx: 500,
      dx: 500,
			cy: 250,
      dy: 290
		}	
	]
}

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
