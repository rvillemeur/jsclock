function startClock()
{
    window.MyClock = new Clock();
    setInterval("MyClock.move(xmouse, ymouse)",20);
}

function addEvent(obj, evType, fn){
    if (obj.addEventListener)
    {
        obj.addEventListener(evType, fn, true);
        return true;
    } 
    else if (obj.attachEvent)
    {
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } 
    else 
    {
        return false;
    }
}

addEvent(window, 'load', startClock);