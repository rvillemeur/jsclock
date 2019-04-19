import { ClockNeedlesSecond, ClockNeedlesHour, ClockNeedlesMinute, ClockCommonTraits } from '../src/clock.js'
import { expect } from 'chai'

describe('test clock', function () {
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
