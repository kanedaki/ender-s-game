import React from 'react'

function renderPlayerStatus(status) {
  switch(status) {
    case 'injured':  
      return 'grey'
    case 'inmobilized':
      return 'black'
    default:
      return ''
  } 
}

const Player= ({ cx, cy, r=6, color, status}) =>
  <circle cx={cx} cy={cy} r={r} stroke={renderPlayerStatus(status)} fill={ color } />

export default Player


