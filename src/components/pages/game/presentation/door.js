import React from 'react'

const Door= ({ cx, cy, dx, dy, team }) => {
  return <line x1={cx} x2={dx} y1={cy} y2={dy} stroke={team} strokeWidth='7' />
}

export default Door 


