import React from 'react'

const Player= ({ cx, cy, r=6, color}) =>
  <circle cx={cx} cy={cy} r={r} stroke='#000000' fill={ color } />

export default Player


