const initialState = {
  player: {
		id: 1,
    team: 'red',
    radio: 6,
    cx: 40,
    cy: 40,
    isMoving: true,
    direction: 'left'
  },
  bullets: [],
	polygons: [
    [[100,100], [150,100], [150,300], [100, 300]],
	  [[300, 200], [350, 200], [350,250], [300, 250]],
	  [[300, 400], [350, 400], [350,450], [300, 450]]
	],
	doors: [
		{
      team: 'blue',
			cx: 0,
			cy: 20,
      dx: 0,
      dy: 60
		},
		{
      team: 'red',
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
        player: playerReducer(state.player, action)
      }
    default: 
      return state
  } 
}
