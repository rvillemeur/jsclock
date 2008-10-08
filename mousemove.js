//enregistrement des évènements de la souris.
xmouse = 0;
ymouse = 0;

var moz=(document.getElementById&&!document.all);
if(moz) {
  document.addEventListener('mousemove',GetPosition, true);
}
if(document.all) {
  document.onmousemove=GetPosition;
}

/*
  capture la postion de la souris
*/
function GetPosition(e) {
  if (document.all) e=window.event;
  xmouse = (document.all) ? e.offsetX : e.clientX;
  ymouse = (document.all) ? e.offsetY : e.clientY;
}