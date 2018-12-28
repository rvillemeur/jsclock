QUnit.test("initialize date test", function (assert) {
    var clock = Clock.create();
    assert.equal(clock.initializeDate(new Date('August 19, 1975 23:15:30')), ' MARDI 19 AOUT 1975', "initialize date passed");
});