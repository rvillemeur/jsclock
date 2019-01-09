const { test } = QUnit;
QUnit.module( "Clock Date", () => {
  test( "initialize clock date", t => {
        t.equal( ClockDate.initializeLabel(new Date('August 19, 1975 23:15:30')), ' MARDI 19 AOUT 1975'
        , "initialize date passed" );
        
        t.equal( ClockDate.initialize(['A','B']).toString()
        , '{x:0, y:0},{x:0, y:0}'
        , "initializePosition passed")
  });
  test( "calculate new position", t => {
        t.deepEqual(ClockDate.getNewPosition(ClockDate.initialize(['A','B'])
        , HtmlPoint.create(10, 10, {}), 0.6, []).toString()
        , '{x:-6, y:-6},{x:4, y:4}'
        , "get new position date passed");
   });
});

QUnit.module( "Point", () => {
    test( "Point accessibility", t => {
        t.equal(HtmlPoint.create(10,10, {}).toString(),
        '{x:10, y:10}',
        "initialize Point passed" );
    });
    test( "Point method", t => {
        t.equal(HtmlPoint.create(10,10, {}).getDistance(HtmlPoint.create(15, 15, {})).toString()
        , '{x:5, y:5}'
        , "get distance between point passed" );
        
        t.equal(HtmlPoint.create(10,10, {}).addVector(HtmlPoint.create(15, 15, {})).toString()
        , '{x:25, y:25}'
        , "add vector to a point passed" );

        t.equal(HtmlPoint.create(10,10, {}).multiply(0.6).toString()
        , '{x:6, y:6}'
        , "multiply point coordinate passed" );

        t.equal(HtmlPoint.create(10.4,10.4, {}).round().toString()
        , '{x:10, y:10}'
        , "add vector to a point passed" );
    });
});
