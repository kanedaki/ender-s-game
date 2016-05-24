import React, { PropTypes, Component } from 'react'
import Player from '../presentation/player'
import Bullet from '../presentation/bullet'
import Door from '../presentation/door'
import GameState from '../presentation/gameState'

const devTools = __DEV__ ? React.createFactory(require('components/presentation/dev-tools').default) : () => null

export default class GameLayout extends Component {
  componentWillMount() {
    this.props.startGame()  
  }
	renderPolygons() {
		const { polygons } = this.props
		return polygons.map((p, i) => {
			return (
        <polygon key={i}points={p.reduce((acum, a) => {acum.push(a[0]);acum.push(a[1]);return acum}, [])} style={{fill:"lime", stroke:'purple', strokeWidth:1}} />
			)
		})
	}
  renderBullets() {
    const { bullets } = this.props  
    return bullets.map((bullet, i) => {
      return <Bullet key={i} {...bullet} />
    })
  }
	renderDoors() {
		const { doors } = this.props
		return doors.map((door, i) => {
			return <Door key={i} {...door} />
		})
	}
  renderGameState() {
    const { gameState } = this.props
    if (gameState === 'FINISHED') {
      return <GameState state={gameState} />  
    }  
  }
  renderPlayers() {
    const {players, me} = this.props
    return Object.keys(players).map((player, i) => {
      const {cx, cy, radio, team} = players[player]
      return  <Player key={i} cx={cx} cy={cy} r={radio} color={me === player ? 'green' : team}/>
    })
  }
  render() {
    return (
      <svg height='500' width='500' style={{border: "1px solid black"}}>
				{ this.renderPolygons() }
        { this.renderBullets() }
				{ this.renderDoors() }
        { this.renderPlayers() }
        { this.renderGameState() }
      </svg>
    )
  }
}

GameLayout.propTypes = {
  players: PropTypes.object.isRequired,
  me: PropTypes.string.isRequired,
  bullets: PropTypes.array.isRequired,
  polygons: PropTypes.array.isRequired,
  doors: PropTypes.array.isRequired,
	gameState: PropTypes.string.isRequired
}
