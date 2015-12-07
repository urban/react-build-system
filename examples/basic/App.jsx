import React from 'react'
import { render } from 'react-dom'

const Hello = ({
  message = 'world'
}) => (
  <div>Hello {message} and Urban!</div>
)

export default Hello
