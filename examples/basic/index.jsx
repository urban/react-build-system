import React from 'react'
import Dom from 'react-dom'
import App from './App'

if (typeof document !== 'undefined') {
  Dom.render(
    React.createElement(App),
    document.getElementById('root')
  )
}

export default App
