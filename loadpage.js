/*
  première possibilités, ou on appelle la fonction delay
*/
//window.onload = delay;
/*
  seconde possibilité, ou on appelle une suite d'instruction
*/


//window.onload = function () {
//  setInterval('MyClock.Delay(xmouse, ymouse)',20);
//}


//window.onload = function () {
//  var MyClock = new clock();
//  startClock();
//}

//function addEvent(obj, evType, fn){
// if (obj.addEventListener){
//   obj.addEventListener(evType, fn, true);
//   return true;
// } else if (obj.attachEvent){
//   var r = obj.attachEvent("on"+evType, fn);
//   return r;
// } else {
//   return false;
// }
//}
//
//addEvent(window, 'load', startClock);