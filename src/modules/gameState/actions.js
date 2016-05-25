export function gameFinished(winner) {
  return {
    type: 'GAME_FINISHED',
    payload: {
      winner   
    }
  }  
}

