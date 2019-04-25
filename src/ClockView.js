
var ClockView = Object.assign(Object.create(Object.prototype), {
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

export { ClockView as default }
