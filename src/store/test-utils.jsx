import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
// Import your own reducer
import tokenReducer from './token/tokenSlice'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { token: tokenReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    Wrapper.prototype = {
      children: PropTypes.node
    }
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }