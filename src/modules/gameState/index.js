const initialState = {
  state: 'READY'
}

export default function gameState(state=initialState, action) {
   switch(action.type) {
      case 'GAME_FINISHED':
        return {state: 'FINISHED', winner: action.payload.winner}
      default:
        return state
    } 
}
