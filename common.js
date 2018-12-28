/* 
    boilterplate code to handle event between firefox and internet explorer
*/

if (typeof (common) == "undefined")
    window.common = new Object();

common.addEvent = function(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } else {
        return false;
    }
}