import MousePosition from './mousemove.js'
import addEvent from './common.js'
import Point from './point.js'
import ClockDate from './clockDate.js'

const Clock = Object.assign({}, {
  move: function () {
    const position = Point.create(MousePosition.x + 75, MousePosition.y + 75)
    this.date().move(position)
    this.surround().update(position)
    this.needlesSecond().update(position)
    this.needlesMinute().update(position)
    this.needlesHour().update(position)
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

    const _date = ClockDate.create()
    _date.initialize(window, _clockWidth * 1.5, _clockHeight * 1.5, _speed)
    self.date = () => { return _date }

    const _surround = ClockSurround.create(_clockWidth, _clockHeight, _speed)
    self.surround = () => { return _surround }

    const _needlesSecond = ClockNeedlesSecond.create(_clockWidth / 4.5, _clockHeight / 4.5, _speed)
    self.needlesSecond = () => { return _needlesSecond }

    const _needlesMinute = ClockNeedlesMinute.create(_clockWidth / 4.5, _clockHeight / 4.5, _speed)
    self.needlesMinute = () => { return _needlesMinute }

    const _needlesHour = ClockNeedlesHour.create(_clockWidth / 4.5, _clockHeight / 4.5, _speed)
    self.needlesHour = () => { return _needlesHour }

    addEvent(document, 'mousemove', MousePosition.getPosition)
    return self
  }
})

const ClockCommonTraits = {
  createHtmlElement: function createHtmlElement (label) {
    const element = window.document.createElement('div')

    element.appendChild(window.document.createTextNode(label))
    element.style.cssText = 'position:absolute'
    element.classList.add('clock')

    return element
  },
  updateCssPosition: function updateCssPosition (htmlElement, x, y) {
    htmlElement.style.left = x + 'px'
    htmlElement.style.top = y + 'px'
  },
  initializePositions: function initializePositions (labelArray) {
    return labelArray.map(label => this.position(label))
  },
  position: function position (label) {
    const htmlElement = this.createHtmlElement(label)
    this.attachHtmlToBody(htmlElement)
    return { point: Point.create(0, 0), html: htmlElement }
  },
  attachHtmlToBody: function attachHtmlToBody (htmlElement) {
    const tagBody = window.document.getElementsByTagName('body')[0]
    tagBody.appendChild(htmlElement)
  },
  getNewPosition: function getNewPosition (OriginalpositionList, initPoint, speed, newPositionList) {
    if (OriginalpositionList.length === 0) {
      return newPositionList
    }
    const currentPosition = OriginalpositionList.shift()
    newPositionList.push({ point: initPoint, html: currentPosition.html })

    const currentPoint = currentPosition.point
    const newPoint = currentPoint.addVector(
      initPoint.getDistance(currentPoint).multiply(speed))

    return getNewPosition(OriginalpositionList, newPoint, speed, newPositionList)
  },
  xOffset: function xOffset (width, angle) {
    return width * Math.cos(angle)
  },
  yOffset: function yOffset (heigth, angle) {
    return heigth * Math.sin(angle)
  },
  angle: function angle (currStep, index, split) {
    return currStep + index * split
  },
  x: function x (position, index) {
    return Math.round(position.point.x) +
            this.xOffset(this.clockWidth, this.angle(this.currStep, index, this.circleSplit))
  },
  y: function y (position, index) {
    return Math.round(position.point.y) +
            this.yOffset(this.clockHeight, this.angle(this.currStep, index, this.circleSplit))
  },
  update: function update (point) {
    this.positionList = this.getNewPosition(this.positionList, point, this.speed, [])
    this.updateCurrStep()
    this.draw()
  },
  draw: function draw () {
    this.positionList.forEach((position, index) => {
      this.updateCssPosition(position.html, this.x(position, index), this.y(position, index))
    })
  }
}

const ClockNeedleCommonTraits = {
  xNeedleRelativePosition: function xNeedleRelativePosition () {
    return -2.5
  },
  yNeedleRelativePosition: function yNeedleRelativePosition () {
    return -7
  },
  x: function x (position, index, date) {
    return Math.round(position.point.x) + this.xNeedleRelativePosition() + this.xOffset(index * this.clockWidth, this.angle(date))
  },
  y: function y (position, index, date) {
    return Math.round(position.point.y) + this.yNeedleRelativePosition() + this.yOffset(index * this.clockHeight, this.angle(date))
  },
  draw: function draw (date) {
    this.position.forEach((position, index) => {
      this.updateCssPosition(position.html, this.x(position, index, date), this.y(position, index, date))
    })
  },
  update: function update (point) {
    this.position = this.getNewPosition(this.position, point, this.speed, [])
    this.draw(new Date())
  }
}

const ClockSurround = Object.assign({}, ClockCommonTraits, {
  updateCurrStep: function updateCurrStep () {
    // dummy fonction, so that update is common to clock and surrond.

  },

  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    const surroundArray = '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ')
    Object.defineProperty(self, 'clockWidth', {
      value: clockWidth,
      writable: false
    })
    Object.defineProperty(self, 'clockHeight', {
      value: clockHeight,
      writable: false
    })
    Object.defineProperty(self, 'speed', {
      value: speed,
      writable: false
    })
    Object.defineProperty(self, 'currStep', {
      value: -60 * Math.PI / 180,
      writable: false
    })
    // circle circumference = 2 * Math.PI * R
    Object.defineProperty(self, 'circleSplit', {
      value: 2 * Math.PI / surroundArray.length,
      writable: false
    })
    self.positionList = this.initializePositions(surroundArray)

    return self
  }
})

const ClockNeedlesSecond = Object.assign({}, ClockCommonTraits, ClockNeedleCommonTraits, {
  angle: function angle (date) {
    return (-Math.PI / 2) + (Math.PI * date.getSeconds() / 30)
  },
  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    Object.defineProperty(self, 'clockWidth', {
      value: clockWidth,
      writable: false
    })
    Object.defineProperty(self, 'clockHeight', {
      value: clockHeight,
      writable: false
    })
    Object.defineProperty(self, 'speed', {
      value: speed,
      writable: false
    })
    self.position = this.initializePositions('.....'.split(''))

    return self
  }
})

const ClockNeedlesHour = Object.assign({}, ClockCommonTraits, ClockNeedleCommonTraits, {
  angle: function angle (date) {
    const minuteOffset = Math.PI * parseInt(date.getMinutes()) / 360
    return (-Math.PI / 2) + (Math.PI * date.getHours() / 6) + minuteOffset
  },
  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    Object.defineProperty(self, 'clockWidth', {
      value: clockWidth,
      writable: false
    })
    Object.defineProperty(self, 'clockHeight', {
      value: clockHeight,
      writable: false
    })
    Object.defineProperty(self, 'speed', {
      value: speed,
      writable: false
    })

    self.position = this.initializePositions('...'.split(''))

    return self
  }
})

const ClockNeedlesMinute = Object.assign({}, ClockCommonTraits, ClockNeedleCommonTraits, {
  angle: function angle (date) {
    return (-Math.PI / 2) + (Math.PI * date.getMinutes() / 30)
  },
  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    Object.defineProperty(self, 'clockWidth', {
      value: clockWidth,
      writable: false
    })
    Object.defineProperty(self, 'clockHeight', {
      value: clockHeight,
      writable: false
    })
    Object.defineProperty(self, 'speed', {
      value: speed,
      writable: false
    })

    self.position = this.initializePositions('....'.split(''))

    return self
  }
})

export { Clock as default, ClockDate, ClockSurround, ClockNeedlesSecond, ClockNeedlesHour, ClockNeedlesMinute, ClockCommonTraits, ClockNeedleCommonTraits }
