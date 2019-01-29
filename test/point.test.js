import Point from '../src/point.js'
import { expect } from 'chai'

describe('Test Points', function () {
  context('Point accessibility', function () {
    it('should return a point', function () {
      const point1 = Point.create(10.0, 10.0)
      expect(point1.toString()).to.be.equal('{x:10.00, y:10.00}')
    })
  })
  context('Point method', function () {
    it('get distance between two point', function () {
      const point1 = Point.create(15.0, 15.0)
      const point2 = Point.create(10.0, 10.0)
      const distance = point2.getDistance(point1)
      expect(distance.toString()).to.be.equal('{x:5.00, y:5.00}')
    })
    it('add vector to a point', function () {
      const point1 = Point.create(15.0, 15.0)
      const point2 = Point.create(10.0, 10.0)
      const vector = point2.addVector(point1)
      expect(vector.toString()).to.be.equal('{x:25.00, y:25.00}')
    })
    it('multiply point coordinate', function () {
      const point1 = Point.create(10.0, 10.0)
      const point2 = point1.multiply(0.6)
      expect(point2.toString()).to.be.equal('{x:6.00, y:6.00}')
    })
    it('round point coordinate', function () {
      const point1 = Point.create(10.4, 10.4)
      const point2 = point1.round()
      expect(point2.toString()).to.be.equal('{x:10.00, y:10.00}')
    })
  })
})
