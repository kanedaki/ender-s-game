import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startGame } from 'modules/game/actions'
import GameLayout from 'components/pages/game/composition/gameLayout'

function Game(props) {
 return (
  <GameLayout {...props}/>
 ) 
}

function mapStateToProps(state) {
  return {
    player: state.game.player,
    bullets: state.game.bullets,
		polygons: state.game.polygons,
		doors: state.game.doors,
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startGame }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)

