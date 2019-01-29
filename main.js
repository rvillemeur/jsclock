import addEvent from './common.js'
import Clock from './clock.js'

var MyClock

function initClock () {
  MyClock = Clock.create(40, 40, 0.04)
  addEvent(document.getElementById('start_clock'), 'click', () => {
    MyClock.startClock()
  })

  addEvent(document.getElementById('stop_clock'), 'click', () => {
    MyClock.stopClock()
  })
  MyClock.startClock()
}
addEvent(window, 'load', initClock)
