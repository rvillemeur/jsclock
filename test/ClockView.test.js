import ClockView from '../src/ClockView.js'
import Point from '../src/point.js'
import { expect } from 'chai'
import { JSDOM } from 'jsdom'

describe('test clock date view', function () {
  context('clock date view', function () {
    it('should return a new element with label test', function () {
      const dom = new JSDOM('<!DOCTYPE html>')
      ClockView.create().initialize(dom.window, ['A', 'B'])

      const result = '<!DOCTYPE html><html><head></head><body><div style="position: absolute;" class="clock">A</div><div style="position: absolute;" class="clock">B</div></body></html>'
      expect(dom.serialize()).to.be.equal(result)
    })
    it('should update CSS position', function () {
      const dom = new JSDOM('<!DOCTYPE html>')
      const view = ClockView.create().initialize(dom.window, ['A', 'B'])
      view.updatePosition([Point.create(1, 1), Point.create(2, 2)])

      const result = '<!DOCTYPE html><html><head></head><body><div style="position: absolute; left: 1px; top: 1px;" class="clock">A</div><div style="position: absolute; left: 2px; top: 2px;" class="clock">B</div></body></html>'
      expect(dom.serialize()).to.be.equal(result)
    })
  })
})
