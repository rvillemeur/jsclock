
import { NeedlePresenterTraits, NeedleModelTraits } from './ClockNeedle.Traits.js'

const ClockNeedlesSecondModel = Object.assign({}, NeedleModelTraits, {
  angle (date) {
    return (-Math.PI / 2) + (Math.PI * date.getSeconds() / 30)
  },
  initialize (clockWidth, clockHeight, speed) {
    this.labelArray = '.....'.split('')
    this.initNeedle(clockWidth, clockHeight, speed)

    return this
  }
})

const ClockNeedlesHourModel = Object.assign({}, NeedleModelTraits, {
  angle (date) {
    const minuteOffset = Math.PI * parseInt(date.getMinutes()) / 360
    return (-Math.PI / 2) + (Math.PI * date.getHours() / 6) + minuteOffset
  },
  initialize (clockWidth, clockHeight, speed) {
    this.labelArray = '...'.split('')
    this.initNeedle(clockWidth, clockHeight, speed)

    return this
  }
})

const ClockNeedleMinuteModel = Object.assign({}, NeedleModelTraits, {
  angle (date) {
    return (-Math.PI / 2) + (Math.PI * date.getMinutes() / 30)
  },
  initialize (clockWidth, clockHeight, speed) {
    this.labelArray = '....'.split('')
    this.initNeedle(clockWidth, clockHeight, speed)

    return this
  }
})

// presenter object
const ClockNeedleSecond = Object.assign({}, NeedlePresenterTraits, {
  initialize (display, clockWidth, clockHeight, speed) {
    this.model = ClockNeedlesSecondModel.create().initialize(clockWidth, clockHeight, speed)

    this.initView(display)

    return this
  }
})

const ClockNeedleHour = Object.assign({}, NeedlePresenterTraits, {
  initialize (display, clockWidth, clockHeight, speed) {
    this.model = ClockNeedlesHourModel.create().initialize(clockWidth, clockHeight, speed)

    this.initView(display)

    return this
  }
})

const ClockNeedleMinute = Object.assign({}, NeedlePresenterTraits, {
  initialize (display, clockWidth, clockHeight, speed) {
    this.model = ClockNeedleMinuteModel.create().initialize(clockWidth, clockHeight, speed)

    this.initView(display)

    return this
  }
})
export { ClockNeedleSecond, ClockNeedleHour, ClockNeedleMinute }
