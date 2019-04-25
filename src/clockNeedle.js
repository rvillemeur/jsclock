import Point from './point.js'

const ClockNeedlesSecondModel = Object.assign({}, {
  angle: function angle (date) {
    return (-Math.PI / 2) + (Math.PI * date.getSeconds() / 30)
  },
  initializePositions: function (labelArray) {
    return labelArray.map((label) => Point.create(0, 0))
  },
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
  },
  getDisplayPosition: function (positionArray) {
    const date = new Date()
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index, date), this.y(position, index, date))
    })
    return pos
  },
  xOffset: function xOffset (width, angle) {
    return width * Math.cos(angle)
  },
  yOffset: function yOffset (heigth, angle) {
    return heigth * Math.sin(angle)
  },
  x: function x (position, index, date) {
    return Math.round(position.x) + this.xNeedleRelativePosition() + this.xOffset(index * this.clockWidth(), this.angle(date))
  },
  y: function y (position, index, date) {
    return Math.round(position.y) + this.yNeedleRelativePosition() + this.yOffset(index * this.clockHeight(), this.angle(date))
  },
  initialize: function (clockWidth, clockHeight, speed) {
    this.clockWidth(clockWidth)
    this.clockHeight(clockHeight)
    this.speed(speed)

    return this
  },
  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    const _xNeedleRelativePosition = -2.7
    self.xNeedleRelativePosition = () => { return _xNeedleRelativePosition }

    const _yNeedleRelativePosition = -7
    self.yNeedleRelativePosition = () => { return _yNeedleRelativePosition }

    const _labelArray = '.....'.split('')
    self.labelArray = () => { return _labelArray }

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

const ClockNeedlesHourModel = Object.assign({}, {
  angle: function angle (date) {
    const minuteOffset = Math.PI * parseInt(date.getMinutes()) / 360
    return (-Math.PI / 2) + (Math.PI * date.getHours() / 6) + minuteOffset
  },
  initializePositions: function (labelArray) {
    return labelArray.map((label) => Point.create(0, 0))
  },
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
  },
  getDisplayPosition: function (positionArray) {
    const date = new Date()
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index, date), this.y(position, index, date))
    })
    return pos
  },
  xOffset: function xOffset (width, angle) {
    return width * Math.cos(angle)
  },
  yOffset: function yOffset (heigth, angle) {
    return heigth * Math.sin(angle)
  },
  x: function x (position, index, date) {
    return Math.round(position.x) + this.xNeedleRelativePosition() + this.xOffset(index * this.clockWidth(), this.angle(date))
  },
  y: function y (position, index, date) {
    return Math.round(position.y) + this.yNeedleRelativePosition() + this.yOffset(index * this.clockHeight(), this.angle(date))
  },
  initialize: function (clockWidth, clockHeight, speed) {
    this.clockWidth(clockWidth)
    this.clockHeight(clockHeight)
    this.speed(speed)

    return this
  },
  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    const _xNeedleRelativePosition = -2.7
    self.xNeedleRelativePosition = () => { return _xNeedleRelativePosition }

    const _yNeedleRelativePosition = -7
    self.yNeedleRelativePosition = () => { return _yNeedleRelativePosition }

    const _labelArray = '...'.split('')
    self.labelArray = () => { return _labelArray }

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

const ClockNeedleMinuteModel = Object.assign({}, {
  angle: function angle (date) {
    return (-Math.PI / 2) + (Math.PI * date.getMinutes() / 30)
  },
  initializePositions: function (labelArray) {
    return labelArray.map((label) => Point.create(0, 0))
  },
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
  },
  getDisplayPosition: function (positionArray) {
    const date = new Date()
    const pos = positionArray.map((position, index) => {
      return Point.create(this.x(position, index, date), this.y(position, index, date))
    })
    return pos
  },
  xOffset: function xOffset (width, angle) {
    return width * Math.cos(angle)
  },
  yOffset: function yOffset (heigth, angle) {
    return heigth * Math.sin(angle)
  },
  x: function x (position, index, date) {
    return Math.round(position.x) + this.xNeedleRelativePosition() + this.xOffset(index * this.clockWidth(), this.angle(date))
  },
  y: function y (position, index, date) {
    return Math.round(position.y) + this.yNeedleRelativePosition() + this.yOffset(index * this.clockHeight(), this.angle(date))
  },
  initialize: function (clockWidth, clockHeight, speed) {
    this.clockWidth(clockWidth)
    this.clockHeight(clockHeight)
    this.speed(speed)

    return this
  },
  create: function create (clockWidth, clockHeight, speed) {
    const self = Object.create(this)

    const _xNeedleRelativePosition = -2.7
    self.xNeedleRelativePosition = () => { return _xNeedleRelativePosition }

    const _yNeedleRelativePosition = -7
    self.yNeedleRelativePosition = () => { return _yNeedleRelativePosition }

    const _labelArray = '...'.split('')
    self.labelArray = () => { return _labelArray }

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
  initialize: function (display, labelArray) {
    this.elementList(this.initializeHtmlElements(display, labelArray))

    return this
  },
  create: function create (display, labelArray) {
    var self = Object.create(this)

    var _elementList = []
    self.elementList = function (elementList) {
      if (arguments.length > 0) {
        _elementList = elementList
      } else {
        return _elementList
      }
    }

    return self
  }
})

// presenter object
const ClockNeedleSecond = Object.assign({}, {
  move: function (point) {
    const model = this.model()
    model.update(point)
    this.view().updatePosition(model.getDisplayPosition(model.positionArray()))
  },
  initialize: function (display, clockWidth, clockHeight, speed) {
    this.model(ClockNeedlesSecondModel.create().initialize(clockWidth, clockHeight, speed))

    this.view(ClockDateView.create().initialize(display, this.model().labelArray()))

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

const ClockNeedleHour = Object.assign({}, {
  move: function (point) {
    const model = this.model()
    model.update(point)
    this.view().updatePosition(model.getDisplayPosition(model.positionArray()))
  },
  initialize: function (display, clockWidth, clockHeight, speed) {
    this.model(ClockNeedlesHourModel.create().initialize(clockWidth, clockHeight, speed))

    this.view(ClockDateView.create().initialize(display, this.model().labelArray()))

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

const ClockNeedleMinute = Object.assign({}, {
  move: function (point) {
    const model = this.model()
    model.update(point)
    this.view().updatePosition(model.getDisplayPosition(model.positionArray()))
  },
  initialize: function (display, clockWidth, clockHeight, speed) {
    this.model(ClockNeedleMinuteModel.create().initialize(clockWidth, clockHeight, speed))

    this.view(ClockDateView.create().initialize(display, this.model().labelArray()))

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
export { ClockNeedleSecond, ClockNeedleHour, ClockNeedleMinute }
