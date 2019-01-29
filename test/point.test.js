import Point from '../src/point.js'
import assert from 'assert'

describe('Point accessibility', function () {
  it('should return a point', function () {
    const point1 = Point.create(10.0, 10.0)
    assert.strict.equal('{x:10.00, y:10.00}', point1.toString())
  })
})

describe('Point Method', function () {
  it('get distance between two point', function () {
    const point1 = Point.create(15.0, 15.0)
    const point2 = Point.create(10.0, 10.0)
    const distance = point2.getDistance(point1)
    assert.strict.equal('{x:5.00, y:5.00}', distance.toString())
  })
})
describe('#Point.addVector', function () {
  it('add vector to a point', function () {
    const point1 = Point.create(15.0, 15.0)
    const point2 = Point.create(10.0, 10.0)
    const vector = point2.addVector(point1)
    assert.strict.equal('{x:25.00, y:25.00}', vector.toString())
  })
})
describe('#Point.multiply', function () {
  it('multiply point coordinate', function () {
    const point1 = Point.create(10.0, 10.0)
    const point2 = point1.multiply(0.6)
    assert.strict.equal('{x:6.00, y:6.00}', point2.toString())
  })
})
describe('#Point.round', function () {
  it('round point coordinate', function () {
    const point1 = Point.create(10.4, 10.4)
    const point2 = point1.round()
    assert.strict.equal('{x:10.00, y:10.00}', point2.toString())
  })
})
