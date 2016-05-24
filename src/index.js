// Architecture file
import './main.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Game from 'components/pages/game/context/game'
import configureStore from './core/store/configureStore'

const store = configureStore()
render(
    <Provider store={store}>
      <Game/>
    </Provider>,
  document.getElementById('root')
)
