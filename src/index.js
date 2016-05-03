// Architecture file
import './main.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/layouts/app'
import configureStore from './store/configureStore'
import rawRoutes from './routes'

const store = configureStore()
render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
)
