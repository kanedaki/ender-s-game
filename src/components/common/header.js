import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const { title, username } = this.props
    return (
      <header>
        <h1>appName</h1>
        {' '}
        <p>content.welcome</p>
        <Link to="/">{'home'}</Link>
        {' '}
        <a href onClick={this.handleClick}>{'logout'}</a>
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

