import React, {Component} from 'react'

export default class GameState extends Component {
  render() {
    return (
			<g>
				<text y="200" x='200'>{this.props.state}</text>
			</g> 
    )  
  }  
}
