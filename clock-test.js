import {ClockDate, ClockSurround, ClockNeedlesSecond, ClockNeedlesHour, ClockNeedlesMinute, ClockCommonTraits} from './clock.js'
import Point from './point.js'

const { test } = QUnit;
QUnit.module( "Clock Date", () => {
  test( "initialize clock date", t => {
        t.equal( ClockDate.initializeLabel(new Date('August 19, 1975 23:15:30')), ' MARDI 19 AOUT 1975'
        , "initialize date passed" );
        
        t.equal( ClockCommonTraits.initializePositions(['A','B','c'])
                          .map((item) => item.point)
                          .toString()
        , '{x:0.00, y:0.00},{x:0.00, y:0.00},{x:0.00, y:0.00}'
        , "initializePositions passed")
  });
  test( "calculate new position", t => {
        t.deepEqual(ClockCommonTraits.getNewPosition(
            ClockCommonTraits.initializePositions(['A','B','c']),
                                         Point.create(10.0, 10.0),
                                         0.6,  
                                         [])
                     .map((item) => item.point)
                     .toString()
        , '{x:10.00, y:10.00},{x:-6.00, y:-6.00},{x:3.60, y:3.60}'
        , "get new position date passed");

      t.equal(Math.round(ClockDate.xOffset(10, 0, 0, Math.PI/3 ))
          , 10
          , "xOffset at index 0")
      t.equal(Math.round(ClockDate.xOffset(10, 0, 1, Math.PI/3 ))
          , 5
          , "xOffset at index 1")
      t.equal(Math.round(ClockDate.xOffset(10, 0, 2, Math.PI/4 ))
          , 0.0
          , "xOffset at index 2")
      t.equal(Math.round(ClockDate.yOffset(10, 0, 0, Math.PI/3 ))
          , 0
          , "yOffset at index 0")
      t.equal(Math.round(ClockDate.yOffset(10, 0, 1, Math.PI/6 ))
          , 5
          , "yOffset at index 1")
      t.equal(Math.round(ClockDate.yOffset(10, 0, 2, Math.PI/4 ))
          , 10
          , "yOffset at index 2")
  });
});

QUnit.module( "Point", () => {
    test( "Point accessibility", t => {
        t.equal(Point.create(10.0,10.0).toString(),
        '{x:10.00, y:10.00}',
        "initialize Point passed" );
    });
    test( "Point method", t => {
        t.equal(Point.create(10.0,10.0).getDistance(Point.create(15.0, 15.0)).toString()
        , '{x:5.00, y:5.00}'
        , "get distance between point passed" );
        
        t.equal(Point.create(10.0,10.0).addVector(Point.create(15.0, 15.0)).toString()
        , '{x:25.00, y:25.00}'
        , "add vector to a point passed" );

        t.equal(Point.create(10.0,10.0).multiply(0.6).toString()
        , '{x:6.00, y:6.00}'
        , "multiply point coordinate passed" );

        t.equal(Point.create(10.4,10.4).round().toString()
        , '{x:10.00, y:10.00}'
        , "add vector to a point passed" );
    });
});
