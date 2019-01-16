const { test } = QUnit;
QUnit.module( "Clock Date", () => {
  test( "initialize clock date", t => {
        t.equal( ClockDate.initializeLabel(new Date('August 19, 1975 23:15:30')), ' MARDI 19 AOUT 1975'
        , "initialize date passed" );
        
        t.equal( ClockDate.initializePositions(['A','B','c'])
                          .map((item) => item.point)
                          .toString()
        , '{x:0, y:0},{x:0, y:0},{x:0, y:0}'
        , "initializePositions passed")
  });
  test( "calculate new position", t => {
        t.deepEqual(ClockDate.getNewPosition(
            ClockDate.initializePositions(['A','B','c']),
                                         Point.create(10, 10),
                                         0.6,  
                                         [])
                     .map((item) => item.point)
                     .toString()
        , '{x:-6, y:-6},{x:4, y:4},{x:-2, y:-2}'
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
        t.equal(Point.create(10,10).toString(),
        '{x:10, y:10}',
        "initialize Point passed" );
    });
    test( "Point method", t => {
        t.equal(Point.create(10,10).getDistance(Point.create(15, 15)).toString()
        , '{x:5, y:5}'
        , "get distance between point passed" );
        
        t.equal(Point.create(10,10).addVector(Point.create(15, 15)).toString()
        , '{x:25, y:25}'
        , "add vector to a point passed" );

        t.equal(Point.create(10,10).multiply(0.6).toString()
        , '{x:6, y:6}'
        , "multiply point coordinate passed" );

        t.equal(Point.create(10.4,10.4).round().toString()
        , '{x:10, y:10}'
        , "add vector to a point passed" );
    });
});
