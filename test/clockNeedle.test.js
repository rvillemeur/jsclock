import { ClockNeedlesSecondModel, ClockNeedlesHourModel, ClockNeedleMinuteModel } from '../src/clockNeedle.js'
import { expect } from 'chai'

describe('test needle model', function () {
  context('second needle', function () {
    it('angle at 0 second', function () {
      const date = new Date('December 17, 1995 03:24:00')
      const angle = Math.round(ClockNeedlesSecondModel.angle(date))
      expect(angle).to.be.equal(-2.0)
    })
    it('angle at 15 seconds', function () {
      const date = new Date('December 17, 1995 03:24:15')
      const angle = Math.round(ClockNeedlesSecondModel.angle(date))
      expect(angle).to.be.equal(0.0)
    })
    it('angle at 30 seconds', function () {
      const date = new Date('December 17, 1995 03:24:30')
      const angle = Math.round(ClockNeedlesSecondModel.angle(date))
      expect(angle).to.be.equal(2.0)
    })
  })

  context('minute needle angle', function () {
    it('angle at 0 minutes', function () {
      const date = new Date('December 17, 1995 03:00:00')
      const angle = Math.round(ClockNeedleMinuteModel.angle(date))
      expect(angle).to.be.equal(-2.0)
    })
    it('angle at 15 minutes', function () {
      const date = new Date('December 17, 1995 03:15:00')
      const angle = Math.round(ClockNeedleMinuteModel.angle(date))
      expect(angle).to.be.equal(0.0)
    })
    it('angle at 30 minutes', function () {
      const date = new Date('December 17, 1995 03:30:00')
      const angle = Math.round(ClockNeedleMinuteModel.angle(date))
      expect(angle).to.be.equal(2.0)
    })
  })

  context('hour needle angle', function () {
    it('angle at midnight', function () {
      const date = new Date('December 17, 1995 00:00:00')
      const angle = Math.round(ClockNeedlesHourModel.angle(date))
      expect(angle).to.be.equal(-2.0)
    })
    it('angle at 3:15', function () {
      const date = new Date('December 17, 1995 03:15:00')
      const angle = Math.round(ClockNeedlesHourModel.angle(date))
      expect(angle).to.be.equal(0.0)
    })
    it('angle at 6:60', function () {
      const date = new Date('December 17, 1995 06:30:00')
      const angle = Math.round(ClockNeedlesHourModel.angle(date))
      expect(angle).to.be.equal(2.0)
    })
  })
})
