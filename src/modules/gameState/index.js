const initialState = 'READY'

export default function gameState(state=initialState, action) {
   switch(action.type) {
      case 'PLAYER_WIN':
        return 'FINISHED'
      default:
        return state
    } 
}
