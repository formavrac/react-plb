import { useState } from 'react'
import Button from './Button'

type CounterProps = {
  initialValue?: number
  max?: number
}

function Counter({ initialValue = 0, max = Infinity }: CounterProps) {
  const [count, setCount] = useState(Math.min(initialValue, max))

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div className="flex items-center gap-4">
      <Button onClick={decrement} disabled={count <= 0}>-</Button>
      <span className="text-xl font-semibold text-gray-800">{count}</span>
      {count < max && <Button onClick={increment}>+</Button>}
    </div>
  )
}

export default Counter
