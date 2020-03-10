import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

export const Counter = ({ counter, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {counter}</h2>
    <button onClick={increment}>
      Increment
    </button>
    {' '}
    <Button type='primary'>123333</Button>
    <button onClick={doubleAsync}>
      Double (Async)
    </button>
  </div>
)
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Counter
