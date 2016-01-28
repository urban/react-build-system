import React from 'react'
import Dom from 'react-dom'
import App from './App'

if (typeof document !== 'undefined') {
  Dom.render(
    React.createElement(App, { message: 'Urban' }),
    document.getElementById('root')
  )
}

export default App
