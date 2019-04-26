
var ClockView = Object.assign(Object.create(Object.prototype), {
  createAndAttachHtmlElement (display, tag, label) {
    const element = display.document.createElement('div')

    element.appendChild(display.document.createTextNode(label))
    element.style.cssText = 'position:absolute'
    element.classList.add('clock')
    tag.appendChild(element)

    return element
  },
  initializeHtmlElements (display, labelArray) {
    const tag = display.document.getElementsByTagName('body')[0]
    return labelArray.map(label => this.createAndAttachHtmlElement(display, tag, label))
  },
  updateCssPosition (htmlElement, x, y) {
    htmlElement.style.left = x + 'px'
    htmlElement.style.top = y + 'px'
  },
  updatePosition (positionList) {
    this.elementList.forEach((element, index) => {
      const position = positionList[index]
      this.updateCssPosition(element, position.x, position.y)
    })
  },
  initialize (display, labelArray) {
    this.elementList = this.initializeHtmlElements(display, labelArray)

    return this
  },
  create (display, labelArray) {
    var self = Object.create(this)

    Object.defineProperty(self, 'elementList', {
      value: [],
      writable: true
    })

    return self
  }
})

export { ClockView as default }
