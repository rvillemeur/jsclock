
import Point from './point.js'

const ClockDateModel = Object.assign(Object.create(Object.prototype), {
  initializeLabel: function initializeLabel (date) {
    const dayName = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'][date.getDay()]
    const monthName = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'][date.getMonth()]
    const dayNumber = date.getDate()
    const year = date.getFullYear()

    return ` ${dayName} ${dayNumber} ${monthName} ${year}`
  },
  initializePositions: function initializePositions (labelArray) {
    return labelArray.map((label) => Point.create(0, 0))
  },
  getNewPosition: function getNewPosition (OriginalpositionArray, initPoint, speed, newPositionArray) {
    if (OriginalpositionArray.length === 0) {
      return newPositionArray
    }
    // get an array [label, point]
    const currentPoint = OriginalpositionArray.shift()
    newPositionArray.push(initPoint)

    const newPoint = currentPoint.addVector(
      initPoint.getDistance(currentPoint).multiply(speed))

    return getNewPosition(OriginalpositionArray, newPoint, speed, newPositionArray)
  },
  update: function update (point) {
    this.positionArray = this.getNewPosition(this.positionArray, point, this.speed, [])
    this.updateCurrStep()
  },
  getDisplayPosition: function getDisplayPosition (positionArray) {
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index), this.y(position, index))
    })
    return pos
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
    return Math.round(position.x) +
            this.xOffset(this.clockWidth, this.angle(this.currStep, index, this.circleSplit))
  },
  y: function y (position, index) {
    return Math.round(position.y) +
            this.yOffset(this.clockHeight, this.angle(this.currStep, index, this.circleSplit))
  },
  updateCurrStep: function updateCurrStep () {
    this.currStep -= this.speed
  },
  create: function create (clockWidth, clockHeight, speed) {
    var self = Object.create(this)

    Object.defineProperty(self, 'labelArray', {
      value: this.initializeLabel(new Date()).split(''),
      writable: true
    })
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
      value: 0,
      writable: true
    })
    // circle circumference = 2 * Math.PI * R
    Object.defineProperty(self, 'circleSplit', {
      value: 2 * Math.PI / self.labelArray.length,
      writable: false
    })
    Object.defineProperty(self, 'positionArray', {
      value: this.initializePositions(self.labelArray),
      writable: true
    })

    return self
  }
})

var ClockDateView = Object.assign(Object.create(Object.prototype), {
  createAndAttachHtmlElement: function createAndAttachHtmlElement (display, tag, label) {
    const element = display.document.createElement('div')

    element.appendChild(display.document.createTextNode(label))
    element.style.cssText = 'position:absolute'
    element.classList.add('clock')
    tag.appendChild(element)

    return element
  },
  initializeHtmlElements: function initializeHtmlElements (display, labelArray) {
    const tag = display.document.getElementsByTagName('body')[0]
    return labelArray.map(label => this.createAndAttachHtmlElement(display, tag, label))
  },
  updateCssPosition: function updateCssPosition (htmlElement, x, y) {
    htmlElement.style.left = x + 'px'
    htmlElement.style.top = y + 'px'
  },
  updatePosition: function updatePosition (positionList) {
    this.elementList.forEach((element, index) => {
      const position = positionList[index]
      this.updateCssPosition(element, position.x, position.y)
    })
  },
  create: function create (display, labelArray) {
    var self = Object.create(this)

    Object.defineProperty(self, 'elementList', {
      value: this.initializeHtmlElements(display, labelArray),
      writable: false
    })
    return self
  }
})

// presenter object
const ClockDate = Object.assign({}, {
  move: function move (point) {
    this.model.update(point)
    const displayPos = this.model.getDisplayPosition(this.model.positionArray)
    this.view.updatePosition(displayPos)
  },
  create: function create (display, clockWidth, clockHeight, speed) {
    var self = Object.create(this)

    Object.defineProperty(self, 'model', {
      value: ClockDateModel.create(clockWidth, clockHeight, speed),
      writable: false
    })
    Object.defineProperty(self, 'view', {
      value: ClockDateView.create(display, self.model.labelArray),
      writable: false
    })
    return self
  }
})

export { ClockDate as default, ClockDateModel, ClockDateView }
