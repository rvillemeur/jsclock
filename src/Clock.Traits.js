import ClockView from './ClockView.js'
import Point from './point.js'

const ClockPresenterTraits = {
  move (point) {
    const model = this.model
    model.update(point)
    this.view.updatePosition(model.getDisplayPosition(model.positionArray))
  },
  initView (display) {
    this.view = ClockView.create().initialize(display, this.model.labelArray)
  },
  create () {
    var self = Object.create(this)

    Object.defineProperty(self, 'model', {
      value: {},
      writable: true
    })

    Object.defineProperty(self, 'view', {
      value: {},
      writable: true
    })

    return self
  }
}

const ClockCommonModelTraits = {
  initializePositions (labelArray) {
    return labelArray.map((label) => Point.create(0, 0))
  },
  // this signature is needed because it's a recursive function.
  // and that way we can unit test it.
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
  xOffset: function (width, angle) {
    return width * Math.cos(angle)
  },
  yOffset: function (heigth, angle) {
    return heigth * Math.sin(angle)
  }
}
const NeedleModelTraits = {
  update (point) {
    const newPositionArray = this.getNewPosition(this.positionArray, point, this.speed, [])
    this.positionArray = newPositionArray
  },
  getDisplayPosition (positionArray) {
    const date = new Date()
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index, date), this.y(position, index, date))
    })
    return pos
  },
  x (position, index, date) {
    return Math.round(position.x) + this.xNeedleRelativePosition + this.xOffset(index * this.clockWidth, this.angle(date))
  },
  y (position, index, date) {
    return Math.round(position.y) + this.yNeedleRelativePosition + this.yOffset(index * this.clockHeight, this.angle(date))
  },
  initNeedle (clockWidth, clockHeight, speed) {
    this.clockWidth = clockWidth
    this.clockHeight = clockHeight
    this.speed = speed
    this.positionArray = this.initializePositions(this.labelArray)
  },
  create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    Object.defineProperty(self, 'xNeedleRelativePosition', {
      value: -2.7
    })

    Object.defineProperty(self, 'yNeedleRelativePosition', {
      value: -7
    })

    Object.defineProperty(self, 'labelArray', {
      value: [],
      writable: true
    })

    Object.defineProperty(self, 'positionArray', {
      value: [],
      writable: true
    })

    Object.defineProperty(self, 'clockWidth', {
      value: 0,
      writable: true
    })

    Object.defineProperty(self, 'clockHeight', {
      value: 0,
      writable: true
    })

    Object.defineProperty(self, 'speed', {
      value: 0,
      writable: true
    })
    return self
  }
}

const ClockModelTraits = {
  update (point) {
    const newPositionArray = this.getNewPosition(this.positionArray, point, this.speed, [])
    this.positionArray = newPositionArray
    this.updateCurrStep()
  },
  getDisplayPosition: function (positionArray) {
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index), this.y(position, index))
    })
    return pos
  },
  angle (currStep, index, split) {
    return currStep + index * split
  },
  x (position, index) {
    return Math.round(position.x) +
            this.xOffset(this.clockWidth, this.angle(this.currStep, index, this.circleSplit))
  },
  y (position, index) {
    return Math.round(position.y) +
            this.yOffset(this.clockHeight, this.angle(this.currStep, index, this.circleSplit))
  },
  init (clockWidth, clockHeight, speed) {
    this.clockWidth = clockWidth
    this.clockHeight = clockHeight
    this.speed = speed
    this.circleSplit = 2 * Math.PI / this.labelArray.length
    this.positionArray = this.initializePositions(this.labelArray)
  },
  create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    Object.defineProperty(self, 'labelArray', {
      value: [],
      writable: true
    })

    Object.defineProperty(self, 'circleSplit', {
      value: 0,
      writable: true
    })

    Object.defineProperty(self, 'currStep', {
      value: 0,
      writable: true
    })

    Object.defineProperty(self, 'positionArray', {
      value: [],
      writable: true
    })

    Object.defineProperty(self, 'clockWidth', {
      value: 0,
      writable: true
    })

    Object.defineProperty(self, 'clockHeight', {
      value: 0,
      writable: true
    })

    Object.defineProperty(self, 'speed', {
      value: 0,
      writable: true
    })
    return self
  }
}

export { ClockPresenterTraits, NeedleModelTraits, ClockModelTraits, ClockCommonModelTraits }
