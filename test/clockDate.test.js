import { ClockDateModel } from '../src/clockDate.js'
import Point from '../src/point.js'
import { expect } from 'chai'

describe('test clock date model', function () {
  context('clock date', function () {
    it('should return a point', function () {
      const date = new Date('August 19, 1975 23:15:30')
      const label = ClockDateModel.initializeLabel(date)
      expect(label).to.be.equal(' MARDI 19 AOUT 1975')
    })
  })

  context('Clock positions', function () {
    it('initialize clock positions', function () {
      const positions = ClockDateModel.initializePositions(['A', 'B', 'c'])
      const result = '{x:0.00, y:0.00},{x:0.00, y:0.00},{x:0.00, y:0.00}'
      expect(positions.toString()).to.be.equal(result)
    })
    it('calculate new position', function () {
      const positions = ClockDateModel.initializePositions(['A', 'B', 'c'])
      const point = Point.create(10.0, 10.0)
      const speed = 0.6
      const newPositions = ClockDateModel.getNewPosition(positions, point, speed, [])
      const result = '{x:10.00, y:10.00},{x:-6.00, y:-6.00},{x:3.60, y:3.60}'
      expect(newPositions.toString()).to.be.equal(result)
    })
  })

  context('Clock offset', function () {
    it('xOffset at index 0', function () {
      const offset = Math.round(ClockDateModel.xOffset(10, 0))
      expect(offset).to.be.equal(10.0)
    })
    it('xOffset at index 1', function () {
      const offset = Math.round(ClockDateModel.xOffset(10, Math.PI / 2))
      expect(offset).to.be.equal(0.0)
    })
    it('xOffset at index 2', function () {
      const offset = Math.round(ClockDateModel.xOffset(10, Math.PI))
      expect(offset).to.be.equal(-10.0)
    })
    it('yOffset at index 0', function () {
      const offset = Math.round(ClockDateModel.yOffset(10, 0))
      expect(offset).to.be.equal(0.0)
    })
    it('yOffset at index 1', function () {
      const offset = Math.round(ClockDateModel.yOffset(10, Math.PI / 2))
      expect(offset).to.be.equal(10.0)
    })
    it('yOffset at index 2', function () {
      const offset = Math.round(ClockDateModel.yOffset(10, Math.PI))
      expect(offset).to.be.equal(0.0)
    })
    it('show -60 degree in radian', function () {
      const angle = ClockDateModel.angle(-60 * Math.PI / 180, 0, 0)
      expect(angle).to.be.equal(-60 * Math.PI / 180)
    })
  })
})
