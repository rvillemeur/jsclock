function initClock() {
    window.MyClock = Clock.create(40, 40, 0.04);
    common.addEvent(document.getElementById("start_clock"), 'click', () => { MyClock.startClock(); });
    common.addEvent(document.getElementById("stop_clock"), 'click', () => { MyClock.stopClock(); });
    MyClock.startClock();
}
common.addEvent(window, 'load', initClock);
