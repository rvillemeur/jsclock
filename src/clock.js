import MousePosition from './mousemove.js'
import addEvent from './common.js'
import Point from './point.js'
import ClockDate from './clockDate.js'
import { ClockNeedleSecond, ClockNeedleHour, ClockNeedleMinute } from './clockNeedle.js'
import ClockSurround from './ClockSurround.js'

const Clock = Object.assign({}, {
  move: function () {
    const position = Point.create(MousePosition.x + 75, MousePosition.y + 75)
    this.date().move(position)
    this.surround().move(position)
    this.needlesSecond().move(position)
    this.needlesMinute().move(position)
    this.needlesHour().move(position)
  },
  startClock: function () {
    this.stopClock()
    const self = this
    self.timer = setInterval(() => { self.move() }, 20)
  },
  stopClock: function () {
    clearInterval(this.timer)
  },
  create: function create () {
    const self = Object.create(this)

    const _clockHeight = 40
    self.clockHeight = function clockHeight () {
      return _clockHeight
    }

    const _clockWidth = 40
    self.clockWidth = function clockWidth () {
      return _clockWidth
    }

    const _speed = 0.04
    self.speed = function speed () {
      return _speed
    }

    const _date = ClockDate.create().initialize(window, _clockWidth * 1.5, _clockHeight * 1.5, _speed)
    self.date = () => { return _date }

    const _surround = ClockSurround.create().initialize(window, _clockWidth, _clockHeight, _speed)
    self.surround = () => { return _surround }

    const _needlesSecond = ClockNeedleSecond.create().initialize(window, _clockWidth / 4.5, _clockHeight / 4.5, _speed)
    self.needlesSecond = () => { return _needlesSecond }

    const _needlesMinute = ClockNeedleMinute.create().initialize(window, _clockWidth / 4.5, _clockHeight / 4.5, _speed)
    self.needlesMinute = () => { return _needlesMinute }

    const _needlesHour = ClockNeedleHour.create().initialize(window, _clockWidth / 4.5, _clockHeight / 4.5, _speed)
    self.needlesHour = () => { return _needlesHour }

    addEvent(document, 'mousemove', MousePosition.getPosition)
    return self
  }
})

export { Clock as default, ClockDate }
