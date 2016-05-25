const initialState = {
  me: '1',
  players: {
    1: {
      team: 'red',
			status: 'ok',
      radio: 6,
      cx: 7,
      cy: 20,
      isMoving: false,
      direction: 'left'
    },
    2: {
      team: 'red',
			status: 'ok',
      radio: 6,
      cx: 7,
      cy: 26,
      isMoving: false,
      direction: 'left'
    },
    3: {
      team: 'blue',
			status: 'ok',
      radio: 6,
      cx: 493,
      cy: 250,
      isMoving: false,
      direction: 'left'
    },
    4: {
      team: 'blue',
			status: 'ok',
      radio: 6,
      cx: 493,
      cy: 256,
      isMoving: false,
      direction: 'left'
    }
  },
  bullets: [],
	polygons: [
    [[100,100], [150,100], [150,300], [100, 300]],
	  [[300, 200], [350, 200], [350,250], [300, 250]],
	  [[300, 400], [350, 400], [350,450], [300, 450]]
	],
	doors: [
		{
      team: 'red',
			cx: 0,
			cy: 20,
      dx: 0,
      dy: 60
		},
		{
      team: 'blue',
			cx: 500,
      dx: 500,
			cy: 250,
      dy: 290
		}	
	]
}
 
export default initialState
