import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {syncHistory} from 'react-router-redux'
import reducer from 'modules/reducer'
import DevTools from 'components/presentation/dev-tools'

const reduxRouter = syncHistory(browserHistory)

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(reduxRouter, thunk),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()

    )
  )

  // reduxRouter.listenForReplays(store, state => ensureState(state).get('routing'))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('modules/reducer', () => {
      const nextReducer = require('modules/reducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
