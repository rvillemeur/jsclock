
import Point from './point.js'

const ClockDateModel = Object.assign(Object.create(Object.prototype), {
  initializeLabel: function (date) {
    const dayName = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'][date.getDay()]
    const monthName = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'][date.getMonth()]
    const dayNumber = date.getDate()
    const year = date.getFullYear()

    return ` ${dayName} ${dayNumber} ${monthName} ${year}`
  },
  initializePositions: function (labelArray) {
    return labelArray.map((label) => Point.create(0, 0))
  },
  // this signature is needed because it's a recursive function.
  getNewPosition: function getNewPosition (OriginalpositionArray, initPoint, speed, newPositionArray) {
    if (OriginalpositionArray.length === 0) {
      return newPositionArray
    }
    const currentPoint = OriginalpositionArray.shift()
    newPositionArray.push(initPoint)

    const newPoint = currentPoint.addVector(
      initPoint.getDistance(currentPoint).multiply(speed))

    return getNewPosition(OriginalpositionArray, newPoint, speed, newPositionArray)
  },
  update: function (point) {
    const newPositionArray = this.getNewPosition(this.positionArray(), point, this.speed(), [])
    this.positionArray(newPositionArray)
    this.updateCurrStep()
  },
  getDisplayPosition: function (positionArray) {
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index), this.y(position, index))
    })
    return pos
  },
  xOffset: function (width, angle) {
    return width * Math.cos(angle)
  },
  yOffset: function (heigth, angle) {
    return heigth * Math.sin(angle)
  },
  angle: function (currStep, index, split) {
    return currStep + index * split
  },
  x: function (position, index) {
    return Math.round(position.x) +
            this.xOffset(this.clockWidth(), this.angle(this.currStep(), index, this.circleSplit()))
  },
  y: function (position, index) {
    return Math.round(position.y) +
            this.yOffset(this.clockHeight(), this.angle(this.currStep(), index, this.circleSplit()))
  },
  updateCurrStep: function () {
    this.currStep(this.currStep() - this.speed())
  },
  create: function (clockWidth, clockHeight, speed) {
    var self = Object.create(this)

    const _labelArray = self.initializeLabel(new Date()).split('')
    self.labelArray = () => { return _labelArray }

    const _circleSplit = 2 * Math.PI / _labelArray.length
    self.circleSplit = () => { return _circleSplit }

    const _clockWidth = clockWidth
    self.clockWidth = () => { return _clockWidth }

    const _clockHeight = clockHeight
    self.clockHeight = () => { return _clockHeight }

    const _speed = speed
    self.speed = () => { return _speed }

    var _currStep = 0
    self.currStep = function (currStep) {
      if (arguments.length > 0) {
        _currStep = currStep
      } else {
        return _currStep
      }
    }

    var _positionArray = this.initializePositions(_labelArray)
    self.positionArray = function (positionArray) {
      if (arguments.length > 0) {
        _positionArray = positionArray
      } else {
        return _positionArray
      }
    }

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
  initializeHtmlElements: function (display, labelArray) {
    const tag = display.document.getElementsByTagName('body')[0]
    return labelArray.map(label => this.createAndAttachHtmlElement(display, tag, label))
  },
  updateCssPosition: function (htmlElement, x, y) {
    htmlElement.style.left = x + 'px'
    htmlElement.style.top = y + 'px'
  },
  updatePosition: function (positionList) {
    this.elementList().forEach((element, index) => {
      const position = positionList[index]
      this.updateCssPosition(element, position.x, position.y)
    })
  },
  create: function create (display, labelArray) {
    var self = Object.create(this)

    const _elementList = self.initializeHtmlElements(display, labelArray)
    self.elementList = () => { return _elementList }

    return self
  }
})

// presenter object
const ClockDate = Object.assign({}, {
  move: function (point) {
    const model = this.model()
    model.update(point)
    this.view().updatePosition(model.getDisplayPosition(model.positionArray()))
  },
  create: function (display, clockWidth, clockHeight, speed) {
    var self = Object.create(this)

    const _model = ClockDateModel.create(clockWidth, clockHeight, speed)
    self.model = () => { return _model }

    const _view = ClockDateView.create(display, _model.labelArray())
    self.view = () => { return _view }

    return self
  }
})

export { ClockDate as default, ClockDateModel, ClockDateView }
