import { ClockDateModel, ClockDateView } from '../src/clockDate.js'
import Point from '../src/point.js'
import { expect } from 'chai'
import { JSDOM } from 'jsdom'

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

describe('test clock date view', function () {
  context('clock date view', function () {
    it('should return a new element with label test', function () {
      const dom = new JSDOM('<!DOCTYPE html>')
      ClockDateView.create(dom.window, ['A', 'B'])

      const result = '<!DOCTYPE html><html><head></head><body><div style="position: absolute;" class="clock">A</div><div style="position: absolute;" class="clock">B</div></body></html>'
      expect(dom.serialize()).to.be.equal(result)
    })
    it('should update CSS position', function () {
      const dom = new JSDOM('<!DOCTYPE html>')
      const view = ClockDateView.create(dom.window, ['A', 'B'])
      view.updatePosition([Point.create(1, 1), Point.create(2, 2)])

      const result = '<!DOCTYPE html><html><head></head><body><div style="position: absolute; left: 1px; top: 1px;" class="clock">A</div><div style="position: absolute; left: 2px; top: 2px;" class="clock">B</div></body></html>'
      expect(dom.serialize()).to.be.equal(result)
    })
  })
})
