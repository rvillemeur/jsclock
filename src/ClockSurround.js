import { ClockPresenterTraits, ClockModelTraits, ClockCommonModelTraits } from './Clock.Traits.js'

const ClockSurroundModel = Object.assign(Object.create(Object.prototype), ClockCommonModelTraits, ClockModelTraits, {
  updateCurrStep: function () {
    // dummy fonction, so that update is common to clock and surrond.
  },
  initialize: function (clockWidth, clockHeight, speed) {
    this.labelArray = '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ')
    this.init(clockWidth, clockHeight, speed)

    return this
  }
})

const ClockSurround = Object.assign({}, ClockPresenterTraits, {
  initialize: function (display, clockWidth, clockHeight, speed) {
    this.model = ClockSurroundModel.create().initialize(clockWidth, clockHeight, speed)

    this.initView(display)

    return this
  }
})

export { ClockSurround as default }
