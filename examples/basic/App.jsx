import React, { PropTypes } from 'react'

const App = ({
  message
}) => (
  <div>Hello {message} and welcome!</div>
)

App.propTypes = {
  message: PropTypes.string
}

export default App
