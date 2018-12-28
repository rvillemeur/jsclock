function initClock()
{
    window.MyClock = Clock.create();
    common.addEvent(document.getElementById("stop_clock"), 'click', function( ) {MyClock.stopClock(); });
    
    MyClock.startClock();
}


common.addEvent(window, 'load', initClock);