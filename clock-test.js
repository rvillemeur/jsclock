import {ClockDate, ClockSurround, ClockNeedlesSecond, ClockNeedlesHour, ClockNeedlesMinute, ClockCommonTraits, ClockNeedleCommonTraits} from './clock.js'
import Point from './point.js'

const { test } = QUnit;
QUnit.module( "Clock Date", () => {
  test( "initialize clock date", t => {
        t.equal( ClockDate.initializeLabel(new Date('August 19, 1975 23:15:30')), ' MARDI 19 AOUT 1975'
        , "initialize date passed" );
  });
});

QUnit.module( "second needle", () => {
    test( "second needle angle", t => {
        t.equal(Math.round(ClockNeedlesSecond.angle(new Date('December 17, 1995 03:24:00')))
            , -2.0
            , "angle at 0 second")
        t.equal(Math.round(ClockNeedlesSecond.angle(new Date('December 17, 1995 03:24:15')))
            , 0.0
            , "angle at 15 seconds")
        t.equal(Math.round(ClockNeedlesSecond.angle(new Date('December 17, 1995 03:24:30')))
            , 2.0
            , "angle at 30 seconds")
    });
});

  QUnit.module( "minute needle", () => {
    test( "minute needle angle", t => {
        t.equal(Math.round(ClockNeedlesMinute.angle(new Date('December 17, 1995 03:00:00')))
            , -2.0
            , "angle at 0 minutes")
        t.equal(Math.round(ClockNeedlesMinute.angle(new Date('December 17, 1995 03:15:00')))
            , 0.0
            , "angle at 15 minutes")
        t.equal(Math.round(ClockNeedlesMinute.angle(new Date('December 17, 1995 03:30:00')))
            , 2.0
            , "angle at 30 minutes")
    });
});

  QUnit.module( "hour needle", () => {
    test( "hour needle angle", t => {
        t.equal(Math.round(ClockNeedlesHour.angle(new Date('December 17, 1995 00:00:00')))
            , -2.0
            , "angle at 3:15")
        t.equal(Math.round(ClockNeedlesHour.angle(new Date('December 17, 1995 03:15:00')))
            , 0.0
            , "angle at midnight")
        t.equal(Math.round(ClockNeedlesHour.angle(new Date('December 17, 1995 06:30:00')))
            , 2.0
            , "angle at 6:60")
    });
});

QUnit.module( "Clock common traits", () => {
    test( "initialize clock date", t => {
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
          , "get new position passed");
    });
    test( "Clock  offset", t => {
        t.equal(Math.round(ClockCommonTraits.xOffset(10, 0))
            , 10.0
            , "xOffset at index 0")
        t.equal(Math.round(ClockCommonTraits.xOffset(10, Math.PI/2))
            , 0.0
            , "xOffset at index 1")
        t.equal(Math.round(ClockCommonTraits.xOffset(10, Math.PI))
            , -10.0
            , "xOffset at index 2")
        t.equal(Math.round(ClockCommonTraits.yOffset(10,0))
            , 0.0
            , "yOffset at index 0")
        t.equal(Math.round(ClockCommonTraits.yOffset(10, Math.PI/2))
            , 10.0
            , "yOffset at index 1")
        t.equal(Math.round(ClockCommonTraits.yOffset(10, Math.PI))
            , 0.0
            , "yOffset at index 2")
    });
    test( "test angle", t => {
        t.equal( ClockCommonTraits.angle(-60 * Math.PI/180, 0, 0), -60 * Math.PI/180
        , "angle test passed");
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
