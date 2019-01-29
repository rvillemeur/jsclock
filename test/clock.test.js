import { ClockDate, ClockNeedlesSecond, ClockNeedlesHour, ClockNeedlesMinute, ClockCommonTraits } from '../src/clock.js'
// import Point from '../src/point.js'
import { expect } from 'chai'

describe('test clock', function () {
  context('clock date', function () {
    it('should return a point', function () {
      const date = new Date('August 19, 1975 23:15:30')
      const label = ClockDate.initializeLabel(date)
      expect(label).to.be.equal(' MARDI 19 AOUT 1975')
    })
  })

  context('second needle', function () {
    it('angle at 0 second', function () {
      const date = new Date('December 17, 1995 03:24:00')
      const angle = Math.round(ClockNeedlesSecond.angle(date))
      expect(angle).to.be.equal(-2.0)
    })
    it('angle at 15 seconds', function () {
      const date = new Date('December 17, 1995 03:24:15')
      const angle = Math.round(ClockNeedlesSecond.angle(date))
      expect(angle).to.be.equal(0.0)
    })
    it('angle at 30 seconds', function () {
      const date = new Date('December 17, 1995 03:24:30')
      const angle = Math.round(ClockNeedlesSecond.angle(date))
      expect(angle).to.be.equal(2.0)
    })
  })

  context('minute needle angle', function () {
    it('angle at 0 minutes', function () {
      const date = new Date('December 17, 1995 03:00:00')
      const angle = Math.round(ClockNeedlesMinute.angle(date))
      expect(angle).to.be.equal(-2.0)
    })
    it('angle at 15 minutes', function () {
      const date = new Date('December 17, 1995 03:15:00')
      const angle = Math.round(ClockNeedlesMinute.angle(date))
      expect(angle).to.be.equal(0.0)
    })
    it('angle at 30 minutes', function () {
      const date = new Date('December 17, 1995 03:30:00')
      const angle = Math.round(ClockNeedlesMinute.angle(date))
      expect(angle).to.be.equal(2.0)
    })
  })

  context('hour needle angle', function () {
    it('angle at midnight', function () {
      const date = new Date('December 17, 1995 00:00:00')
      const angle = Math.round(ClockNeedlesHour.angle(date))
      expect(angle).to.be.equal(-2.0)
    })
    it('angle at 3:15', function () {
      const date = new Date('December 17, 1995 03:15:00')
      const angle = Math.round(ClockNeedlesHour.angle(date))
      expect(angle).to.be.equal(0.0)
    })
    it('angle at 6:60', function () {
      const date = new Date('December 17, 1995 06:30:00')
      const angle = Math.round(ClockNeedlesHour.angle(date))
      expect(angle).to.be.equal(2.0)
    })
  })

  context('Clock common traits', function () {
    // it('initialize clock positions', function () {
    //   const points = ClockCommonTraits.initializePositions(['A', 'B', 'c'])
    //   const serial = points.map((item) => item.point).toString()
    //   const result = '{x:0.00, y:0.00},{x:0.00, y:0.00},{x:0.00, y:0.00}'
    //   expect(serial).to.be.equal(result)
    // })
    // it('calculate new position', function () {
    //   const positions = ClockCommonTraits.initializePositions(['A', 'B', 'c'])
    //   const point = Point.create(10.0, 10.0)
    //   const speed = 0.6
    //   const newPositions = ClockCommonTraits.getNewPosition(positions, point, speed, [])
    //   const serial = newPositions.map((item) => item.point).toString()
    //   const result = '{x:10.00, y:10.00},{x:-6.00, y:-6.00},{x:3.60, y:3.60}'
    //   expect(serial).to.be.equal(result)
    // })
  })

  context('Clock offset', function () {
    it('xOffset at index 0', function () {
      const offset = Math.round(ClockCommonTraits.xOffset(10, 0))
      expect(offset).to.be.equal(10.0)
    })
    it('xOffset at index 1', function () {
      const offset = Math.round(ClockCommonTraits.xOffset(10, Math.PI / 2))
      expect(offset).to.be.equal(0.0)
    })
    it('xOffset at index 2', function () {
      const offset = Math.round(ClockCommonTraits.xOffset(10, Math.PI))
      expect(offset).to.be.equal(-10.0)
    })
    it('yOffset at index 0', function () {
      const offset = Math.round(ClockCommonTraits.yOffset(10, 0))
      expect(offset).to.be.equal(0.0)
    })
    it('yOffset at index 1', function () {
      const offset = Math.round(ClockCommonTraits.yOffset(10, Math.PI / 2))
      expect(offset).to.be.equal(10.0)
    })
    it('yOffset at index 2', function () {
      const offset = Math.round(ClockCommonTraits.yOffset(10, Math.PI))
      expect(offset).to.be.equal(0.0)
    })
    it('show -60 degree in radian', function () {
      const angle = ClockCommonTraits.angle(-60 * Math.PI / 180, 0, 0)
      expect(angle).to.be.equal(-60 * Math.PI / 180)
    })
  })
})
