import Point from '../src/point.js'
import assert from 'assert'

describe('Point accessibility', function () {
  describe('#Point.create', function () {
    it('should return a point', function () {
      assert.strict.equal('{x:10.00, y:10.00}', Point.create(10.0, 10.0).toString())
    })
  })
})

describe('Point Method', function () {
  describe('#Point.gestdistance', function () {
    it('get distance between point', function () {
      assert.strict.equal('{x:5.00, y:5.00}', Point.create(10.0, 10.0).getDistance(Point.create(15.0, 15.0)).toString())
    })
  })
  describe('#Point.addVector', function () {
    it('add vector to a point', function () {
      assert.strict.equal('{x:25.00, y:25.00}', Point.create(10.0, 10.0).addVector(Point.create(15.0, 15.0)).toString())
    })
  })
  describe('#Point.multiply', function () {
    it('multiply point coordinate', function () {
      assert.strict.equal('{x:6.00, y:6.00}', Point.create(10.0, 10.0).multiply(0.6).toString())
    })
  })
  describe('#Point.round', function () {
    it('round point coordinate', function () {
      assert.strict.equal('{x:10.00, y:10.00}', Point.create(10.4, 10.4).round().toString())
    })
  })
})
