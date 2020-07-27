import React, { useState } from 'react'

export const Filter = ({ filterVal }) => {
  const [value, setValue] = useState('')

  const valueChangeHandler = e => {
    setValue(e.target.value)
  }

  return (
    <div>
      <input type="text" onChange={valueChangeHandler}  value={value} />
      <button onClick={() => filterVal(value)}>Filter</button>
    </div>
  )
}