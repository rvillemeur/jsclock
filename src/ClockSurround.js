import Point from './point.js'
import ClockView from './ClockView.js'

const ClockSurroundModel = Object.assign(Object.create(Object.prototype), {
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
    // dummy fonction, so that update is common to clock and surrond.
  },
  initialize: function (clockWidth, clockHeight, speed) {
    this.clockWidth(clockWidth)
    this.clockHeight(clockHeight)
    this.speed(speed)

    return this
  },
  create: function () {
    var self = Object.create(this)

    const _labelArray = '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ')
    self.labelArray = () => { return _labelArray }

    const _circleSplit = 2 * Math.PI / _labelArray.length
    self.circleSplit = () => { return _circleSplit }

    var _clockWidth = 0
    self.clockWidth = function (clockWidth) {
      if (arguments.length > 0) {
        _clockWidth = clockWidth
      } else {
        return _clockWidth
      }
    }

    var _clockHeight = 0
    self.clockHeight = function (clockHeight) {
      if (arguments.length > 0) {
        _clockHeight = clockHeight
      } else {
        return _clockHeight
      }
    }

    var _speed = 0
    self.speed = function (speed) {
      if (arguments.length > 0) {
        _speed = speed
      } else {
        return _speed
      }
    }

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

// presenter object
const ClockSurround = Object.assign({}, {
  move: function (point) {
    const model = this.model()
    model.update(point)
    this.view().updatePosition(model.getDisplayPosition(model.positionArray()))
  },
  initialize: function (display, clockWidth, clockHeight, speed) {
    this.model(ClockSurroundModel.create().initialize(clockWidth, clockHeight, speed))

    this.view(ClockView.create().initialize(display, this.model().labelArray()))

    return this
  },
  create: function () {
    var self = Object.create(this)

    var _model = {}
    self.model = function (model) {
      if (arguments.length > 0) {
        _model = model
      } else {
        return _model
      }
    }

    var _view = {}
    self.view = function (view) {
      if (arguments.length > 0) {
        _view = view
      } else {
        return _view
      }
    }

    return self
  }
})

export { ClockSurround as default }
