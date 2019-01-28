import Point from '../point.js'
import assert from 'assert';

describe('Point accessibility', function() {
  describe('#Point.create', function() {
    it('should return a point', function(){
      assert.equal('{x:10.00, y:10.00}', Point.create(10.0,10.0).toString());
    });
  });
});

