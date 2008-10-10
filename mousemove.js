// enregistrement des évènements de la souris.
// capture la postion de la souris

window.MousePosition = {x :0, y :0};

MousePosition.getPosition = function(evt) 
{
    MousePosition.x = evt.clientX;
    MousePosition.y = evt.clientY;
}

common.addEvent(document,"mousemove",MousePosition.getPosition);