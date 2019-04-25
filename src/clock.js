import MousePosition from './mousemove.js'
import addEvent from './common.js'
import Point from './point.js'
import ClockDate from './clockDate.js'
import { ClockNeedleSecond, ClockNeedleHour, ClockNeedleMinute } from './clockNeedle.js'
import ClockSurround from './ClockSurround.js'

const Clock = Object.assign({}, {
  move: function () {
    const position = Point.create(MousePosition.x + 75, MousePosition.y + 75)
    this.date.move(position)
    this.surround.move(position)
    this.needlesSecond.move(position)
    this.needlesMinute.move(position)
    this.needlesHour.move(position)
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

    Object.defineProperty(self, 'clockHeight', {
      value: 40,
      writable: false
    })
    Object.defineProperty(self, 'clockWidth', {
      value: 40,
      writable: false
    })
    Object.defineProperty(self, 'speed', {
      value: 0.04,
      writable: false
    })
    Object.defineProperty(self, 'date', {
      value: ClockDate.create().initialize(window, self.clockWidth * 1.5, self.clockHeight * 1.5, self.speed),
      writable: false
    })
    Object.defineProperty(self, 'surround', {
      value: ClockSurround.create().initialize(window, self.clockWidth, self.clockHeight, self.speed),
      writable: false
    })
    Object.defineProperty(self, 'needlesSecond', {
      value: ClockNeedleSecond.create().initialize(window, self.clockWidth / 4.5, self.clockHeight / 4.5, self.speed),
      writable: false
    })
    Object.defineProperty(self, 'needlesMinute', {
      value: ClockNeedleMinute.create().initialize(window, self.clockWidth / 4.5, self.clockHeight / 4.5, self.speed),
      writable: false
    })
    Object.defineProperty(self, 'needlesHour', {
      value: ClockNeedleHour.create().initialize(window, self.clockWidth / 4.5, self.clockHeight / 4.5, self.speed),
      writable: false
    })

    addEvent(document, 'mousemove', MousePosition.getPosition)
    return self
  }
})

export { Clock as default, ClockDate }
