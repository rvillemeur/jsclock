function initClock()
{
    window.MyClock = new Clock();
    common.addEvent(document.getElementById("stop_clock"), 'click', function( ) {MyClock.stopClock(); });
    
    MyClock.startClock();
}


common.addEvent(window, 'load', initClock);