import React, {Component} from 'react'

export default class GameState extends Component {
  render() {
    const {state, winner} = this.props
    return (
			<g>
				<text y="200" x='200'>{`${winner} team wins`}</text>
			</g> 
    )  
  }  
}
