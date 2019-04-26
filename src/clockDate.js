import { ClockPresenterTraits, ClockModelTraits, ClockCommonModelTraits } from './Clock.Traits.js'

const ClockDateModel = Object.assign(Object.create(Object.prototype), ClockCommonModelTraits, ClockModelTraits, {
  initializeLabel: function (date) {
    const dayName = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'][date.getDay()]
    const monthName = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'][date.getMonth()]
    const dayNumber = date.getDate()
    const year = date.getFullYear()

    return ` ${dayName} ${dayNumber} ${monthName} ${year}`
  },
  updateCurrStep: function () {
    this.currStep -= this.speed
  },
  initialize (clockWidth, clockHeight, speed) {
    this.labelArray = this.initializeLabel(new Date()).split('')
    this.init(clockWidth, clockHeight, speed)

    return this
  }
})

const ClockDate = Object.assign({}, ClockPresenterTraits, {
  initialize: function (display, clockWidth, clockHeight, speed) {
    this.model = ClockDateModel.create().initialize(clockWidth, clockHeight, speed)

    this.initView(display)

    return this
  }
})

export { ClockDate as default, ClockDateModel }
