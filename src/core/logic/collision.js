const borders = {
  maxTop: 500,
  maxLeft: 500
}

function findOtherTeam(team, object) {
  return object.team !== team
}

export function oppositeDoorCollision(circle, doors, team) {
  return doors.filter(findOtherTeam.bind(null, team)).map(oppositeDoor => {
    return doorCollision(circle, [[oppositeDoor.cx, oppositeDoor.cy], [oppositeDoor.dx, oppositeDoor.dy]])    
  }).some(collision => {
    return collision  
  })
}

function doorCollision(circle, line) {
  return pointLineSegmentDistance(circle, line) <= circle[2]  
}

export function wallCollision(radio, {cx, cy}, polygons) {
  return outBorders(radio, {cx, cy}) || obstacleCollision([cx, cy, radio], polygons)
}

function outBorders(radio, {cx, cy}) {
  return cy - radio <= 0 || cy + radio >= borders.maxTop || cx - radio <=0 || cx + radio >=borders.maxLeft
}

function obstacleCollision(circle, polygons) {
  return polygons.some((p) => {
		return intersects(circle, p)
	})	
}

function intersects(circle, polygon) {
  return pointInPolygon(circle, polygon)
      || polygonEdges(polygon).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; });
}

function polygonEdges(polygon) {
  return polygon.map(function(p, i) {
    return i ? [polygon[i - 1], p] : [polygon[polygon.length - 1], p];
  });
}

function pointInPolygon(point, polygon) {
  for (var n = polygon.length, i = 0, j = n - 1, x = point[0], y = point[1], inside = false; i < n; j = i++) {
    var xi = polygon[i][0], yi = polygon[i][1],
        xj = polygon[j][0], yj = polygon[j][1];
    if ((yi > y ^ yj > y) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}

function pointLineSegmentDistance(point, line) {
  var v = line[0], w = line[1], d, t;
  return Math.sqrt(pointPointSquaredDistance(point, (d = pointPointSquaredDistance(v, w))
      ? ((t = ((point[0] - v[0]) * (w[0] - v[0]) + (point[1] - v[1]) * (w[1] - v[1])) / d) < 0 ? v
      : t > 1 ? w
      : [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])])
      : v));
}

function pointPointSquaredDistance(v, w) {
  var dx = v[0] - w[0], dy = v[1] - w[1];
  return dx * dx + dy * dy;
}
