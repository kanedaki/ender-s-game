import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Player from '../player'
import { startGame } from '../../modules/game/actions'
import Bullet from '../bullet'
import Door from '../door'

const devTools = __DEV__ ? React.createFactory(require('../common/dev-tools').default) : () => null

class App extends Component {
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
  render() {
    const {player: {cx, cy}} = this.props
    return (
      <svg height='500' width='500' style={{border: "1px solid black"}}>
        <Player cx={cx} cy={cy} r={6} fill='#015655'/>
				{ this.renderPolygons() }
        { this.renderBullets() }
				{ this.renderDoors() }
      </svg>
    )
  }
}

App.propTypes = {
}

function mapStateToProps(state) {
  return {
    player: state.game.player,
    bullets: state.game.bullets,
		polygons: state.game.polygons,
		doors: state.game.doors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startGame }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
