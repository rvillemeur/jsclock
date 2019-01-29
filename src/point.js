const Point = Object.assign({}, {
  toString: function toString () {
    return '{x:' + (this.x).toFixed(2) + ', ' +
              'y:' + (this.y).toFixed(2) + '}'
  },
  getDistance: function getDistance (aPoint) {
    return Point.create(aPoint.x - this.x, aPoint.y - this.y)
  },
  addVector: function addVector (aPoint) {
    return Point.create(aPoint.x + this.x, aPoint.y + this.y)
  },
  multiply: function multiply (aFactor) {
    return Point.create(this.x * aFactor, this.y * aFactor)
  },
  round: function round () {
    return Point.create(Math.round(this.x), Math.round(this.y))
  },

  create: function create (x, y) {
    const self = Object.create(this)

    Object.defineProperty(self, 'x', { value: x, writable: false })
    Object.defineProperty(self, 'y', { value: y, writable: false })

    return self
  }
})

export default Point
