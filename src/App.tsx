import { useState } from 'react'

import { Slider } from '@/components'

export function App() {
  const [values, setValues] = useState([1, 100])
  const valueChangeHandler = (value: number[]) => {
    setValues(value)
  }

  return (
    <div
      style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}
    >
      <Slider
        label={'Number of cards'}
        max={100}
        min={0}
        onValueChange={valueChangeHandler}
        value={values}
      />
    </div>
  )
}
