import React from 'react'

const Door= ({ cx, cy, color='blue'}) => {
  return <line x1={cx} x2={cx} y1={cy} y2={cy + 40} stroke={color} strokeWidth='7' />
}

export default Door 


